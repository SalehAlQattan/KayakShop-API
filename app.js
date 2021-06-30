// importing packages
const express = require('express');
const cors = require('cors');
const slugify = require('slugify');
// new instance of express
const app = express();
// importing data
let kayaks = require('./kayaks');

// ===================== start middleware ========================== //
// using cors to allow acces data
app.use(cors());
// parsing body as json
app.use(express.json());
// ===================== end middleware ========================== //

// =====================Start Routes========================== //
// getting all kayaks route
app.get('/kayaks', (req, res) => {
  res.json(kayaks);
});
// deleting kayak route
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
// creating kayak route
app.post('/kayaks', (req, res) => {
  const id = kayaks.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newKayak = {
    id,
    slug,
    ...req.body,
  };
  kayaks.push(newKayak);
  res.status(201).json(newKayak);
});
// =====================End Routes========================== //
// running the server
app.listen(8000, () => console.log('App is running on port 8000'));
