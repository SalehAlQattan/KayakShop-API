// importing packages
const express = require('express');
const cors = require('cors');
// new instance of express
const app = express();
// importing data
let kayaks = require('./kayaks');

// using cors to allow acces data // middleware
app.use(cors());

// =====================Start Routes========================== //
// all kayaks
app.get('/kayaks', (req, res) => {
  res.json(kayaks);
});
// deleting on kayak
app.delete('/kayaks/:kayakId', (req, res) => {
  const { kayakId } = req.params;
  const foundKayak = kayaks.find((kayak) => kayak.id === +kayakId);
  if (foundKayak) {
    kayaks = kayaks.filter((kayak) => kayak.id != +kayakId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: `kayak Id ${kayakId} is not found` });
  }
});
// =====================End Routes========================== //
// running the server
app.listen(8000, () => console.log('App is running on port 8000'));
