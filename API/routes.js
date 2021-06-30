// packages
const express = require('express');
// importing controllers
const {
  fetchKayak,
  deleteKayak,
  createKayak,
  updateKayak,
} = require('../API/controllers');
const router = express.Router();
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
