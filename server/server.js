import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.status(200).send('Booking server is ready');
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Booking server listening on http://localhost:${port}`);
});
