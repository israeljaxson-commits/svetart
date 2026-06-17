import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.resolve(process.cwd(), 'server', 'bookings.db.json');
// Admin auth removed — endpoints are public in this dev setup

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    console.error('Failed to read bookings DB', e);
    return [];
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write bookings DB', e);
  }
}

// Public endpoint to receive bookings
app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.id) {
    return res.status(400).json({ error: 'Invalid booking payload' });
  }

  const db = readDB();
  db.push(booking);
  writeDB(db);

  res.status(201).json({ ok: true, saved: booking.referenceCode });
});

app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json(db);
});
app.delete('/api/bookings', (req, res) => {
  writeDB([]);
  res.json({ ok: true });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Booking server listening on http://localhost:${port}`);
});
