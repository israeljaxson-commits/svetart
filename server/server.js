import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const TIME_SLOTS = [
  '08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30',
  '15:30', '16:30', '17:30', '18:30', '19:30', '20:00',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const bookingsPath = path.join(dataDir, 'bookings.json');

let writeQueue = Promise.resolve();

const withLock = async (task) => {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(() => undefined, () => undefined);
  return run;
};

const ensureStorage = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(bookingsPath);
  } catch {
    await fs.writeFile(bookingsPath, JSON.stringify({ bookings: [] }, null, 2), 'utf8');
  }
};

const readStore = async () => {
  await ensureStorage();
  const raw = await fs.readFile(bookingsPath, 'utf8');
  const parsed = JSON.parse(raw);
  if (!parsed || !Array.isArray(parsed.bookings)) {
    return { bookings: [] };
  }
  return parsed;
};

const writeStore = async (store) => {
  await fs.writeFile(bookingsPath, JSON.stringify(store, null, 2), 'utf8');
};

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get('/', (_req, res) => {
  res.status(200).send('Booking server is ready');
});

app.get('/api/availability', async (req, res) => {
  const date = String(req.query.date || '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DD.' });
    return;
  }

  try {
    const store = await readStore();
    const bookedSlots = store.bookings
      .filter((b) => b.date === date)
      .map((b) => b.time)
      .filter((time, idx, arr) => arr.indexOf(time) === idx)
      .sort();

    const availableSlots = TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));
    res.status(200).json({ date, timeSlots: TIME_SLOTS, bookedSlots, availableSlots });
  } catch (error) {
    console.error('availability_error', error);
    res.status(500).json({ message: 'Failed to load availability.' });
  }
});

app.post('/api/bookings/reserve', async (req, res) => {
  const { service, name, email, phone, date, time, specialRequest = '' } = req.body || {};

  if (!service || !name || !email || !phone || !date || !time) {
    res.status(400).json({ message: 'Missing required booking fields.' });
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
    res.status(400).json({ message: 'Invalid date format. Expected YYYY-MM-DD.' });
    return;
  }

  if (!TIME_SLOTS.includes(String(time))) {
    res.status(400).json({ message: 'Invalid time slot.' });
    return;
  }

  try {
    const result = await withLock(async () => {
      const store = await readStore();
      const alreadyBooked = store.bookings.some((b) => b.date === date && b.time === time);

      if (alreadyBooked) {
        return { conflict: true };
      }

      const booking = {
        id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        service,
        name,
        email,
        phone,
        date,
        time,
        specialRequest,
        createdAt: new Date().toISOString(),
      };

      store.bookings.push(booking);
      await writeStore(store);
      return { conflict: false, booking };
    });

    if (result.conflict) {
      res.status(409).json({ message: 'Time slot already booked.' });
      return;
    }

    res.status(201).json({ message: 'Slot reserved.', booking: result.booking });
  } catch (error) {
    console.error('reserve_error', error);
    res.status(500).json({ message: 'Failed to reserve time slot.' });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Booking server listening on http://localhost:${port}`);
});
