// packages
const express = require('express');
// package
const multer = require('multer');
// importing controllers
const {
  fetchManufacture,
  manufactureFetch,
  createManufacure,
  createKayak,
} = require('./controllers');
// routes
const router = express.Router();
// image uploader package
const multer = require('multer');

// multer
const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
// passing storage to upload
const upload = multer({ storage });

// param middleware
router.param('manufactureId', async (req, res, next, manufactureId) => {
  const manufacture = await manufactureFetch(manufactureId, next);
  if (manufacture) {
    req.manufacture = manufacture;
    next();
  } else {
    const error = new Error('Manufacture Not Found!');
    error.status(404);
    next(error);
  }
});

// getting all manufactures route
router.get('/', fetchManufacture);
// creating manufacture route
router.post('/', upload.single('img'), createManufacure);
// create kayak route
router.post('/:manufactureId/kayaks', upload.single('img'), createKayak);
// exporting the route
module.exports = router;
