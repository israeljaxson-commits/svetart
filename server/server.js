import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_KEY || '';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || '';
const EMAIL_TO = process.env.EMAIL_TO || '';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const emailConfigured = Boolean(SENDGRID_API_KEY && EMAIL_FROM && EMAIL_TO);

const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const DB_PATH = path.resolve(process.cwd(), 'server', 'bookings.db.json');

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

async function getBookingsFromSupabase() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Supabase read error', error);
    throw new Error(error.message);
  }

  return data;
}

async function insertBookingIntoSupabase(booking) {
  if (!supabase) return null;

  const { error, data } = await supabase.from('bookings').insert([
    {
      id: booking.id,
      referenceCode: booking.referenceCode,
      serviceName: booking.serviceName,
      dateString: booking.dateString,
      timeSlot: booking.timeSlot,
      clientName: booking.clientName,
      clientPhone: booking.clientPhone,
      clientEmail: booking.clientEmail,
      clientNotes: booking.clientNotes || null,
      createdAt: booking.createdAt || new Date().toISOString(),
      preselectedServiceId: booking.preselectedServiceId || null,
      timeZone: booking.timeZone || null,
    }
  ]).select('*');

  if (error) {
    console.error('Supabase insert error', error);
    throw new Error(error.message);
  }

  return data?.[0] ?? null;
}

async function deleteBookingsFromSupabase() {
  if (!supabase) return null;

  const { error } = await supabase.from('bookings').delete().neq('id', '');
  if (error) {
    console.error('Supabase delete error', error);
    throw new Error(error.message);
  }

  return true;
}

function saveBookingLocally(booking) {
  const db = readDB();
  db.push(booking);
  writeDB(db);
}

async function sendBookingEmail(booking) {
  if (!emailConfigured) {
    console.warn('SendGrid email not configured; skipping booking email');
    return;
  }

  const htmlBody = `
    <h2>New booking received</h2>
    <p><strong>Reference:</strong> ${booking.referenceCode}</p>
    <p><strong>Service:</strong> ${booking.serviceName}</p>
    <p><strong>Date:</strong> ${booking.dateString}</p>
    <p><strong>Time:</strong> ${booking.timeSlot}</p>
    <p><strong>Name:</strong> ${booking.clientName}</p>
    <p><strong>Phone:</strong> ${booking.clientPhone}</p>
    <p><strong>Email:</strong> ${booking.clientEmail}</p>
    <p><strong>Notes:</strong> ${booking.clientNotes || 'None'}</p>
    <p><strong>Created at:</strong> ${booking.createdAt || new Date().toISOString()}</p>
  `;

  const msg = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    subject: `New booking: ${booking.referenceCode}`,
    html: htmlBody,
  };

  await sgMail.send(msg);
}

const useSupabase = Boolean(supabase);

app.post('/api/bookings', async (req, res) => {
  const booking = req.body;
  if (!booking || !booking.id) {
    return res.status(400).json({ error: 'Invalid booking payload' });
  }

  const responseBody = {
    ok: true,
    saved: booking.referenceCode,
    source: 'local',
    emailSent: false,
  };

  try {
    if (useSupabase) {
      try {
        const savedBooking = await insertBookingIntoSupabase(booking);
        responseBody.saved = savedBooking?.referenceCode ?? booking.referenceCode;
        responseBody.source = 'supabase';
      } catch (persistError) {
        console.error('Supabase insert failed, falling back to local storage', persistError);
        saveBookingLocally(booking);
        responseBody.source = 'local-fallback';
        responseBody.persistError = persistError instanceof Error ? persistError.message : String(persistError);
      }
    } else {
      saveBookingLocally(booking);
    }

    if (emailConfigured) {
      try {
        await sendBookingEmail(booking);
        responseBody.emailSent = true;
      } catch (emailError) {
        console.error('Booking email failed', emailError);
        responseBody.emailError = emailError instanceof Error ? emailError.message : String(emailError);
      }
    }

    return res.status(201).json(responseBody);
  } catch (error) {
    console.error('Booking save error', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to save booking' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    if (useSupabase) {
      const bookings = await getBookingsFromSupabase();
      return res.json(bookings);
    }

    const db = readDB();
    return res.json(db);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch bookings' });
  }
});

app.delete('/api/bookings', async (req, res) => {
  try {
    if (useSupabase) {
      await deleteBookingsFromSupabase();
      return res.json({ ok: true });
    }

    writeDB([]);
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to clear bookings' });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Booking server listening on http://localhost:${port}`);
  if (useSupabase) {
    console.log('Using Supabase for booking persistence.');
  } else {
    console.log('Supabase not configured. Falling back to local JSON storage.');
  }
});
