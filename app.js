// importing packages
const express = require('express');
const cors = require('cors');
// new instance of express
const app = express();
// importing data
const kayaks = require('./kayaks');

// using cors to allow acces data // middleware
app.use(cors());

app.get('/kayaks', (req, res) => {
  res.json(kayaks);
});

// running the server
app.listen(8000, () => console.log('App is running on port 8000'));
