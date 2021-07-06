// packages
const express = require('express');
// importing controllers
const {
  fetchKayak,
  deleteKayak,
  createKayak,
  updateKayak,
  kayakFetch,
} = require('../API/controllers');
// routes
const router = express.Router();

// param middleware
router.param('kayakId', async (req, res, next, kayakId) => {
  const kayak = await kayakFetch(kayakId, next);
  if (kayak) {
    req.kayak = kayak;
    next();
  } else {
    const error = new Error('Kayak Not Found!');
    error.status(404);
    next(error);
  }
});

// getting all kayaks route
router.get('/', fetchKayak);
// deleting kayak route
router.delete('/:kayakId', deleteKayak);
// creating kayak route
router.post('/', createKayak);
// update route
router.put('/:kayakId', updateKayak);
// exporting the route
module.exports = router;
