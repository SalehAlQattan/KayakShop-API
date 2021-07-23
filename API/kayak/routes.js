// packages
const express = require('express');
// importing controllers
const {
  fetchKayak,
  deleteKayak,
  updateKayak,
  kayakFetch,
} = require('./controllers');
// routes
const router = express.Router();
// image uploader package
const multer = require('multer');
const passport = require('passport');

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

// multer
const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
// passing storage to upload
const upload = multer({ storage });
// getting all kayaks route
router.get('/', fetchKayak);
// deleting kayak route
router.delete(
  '/:kayakId',
  passport.authenticate('jwt', { session: false }),
  deleteKayak
);
// update route
router.put(
  '/:kayakId',
  passport.authenticate('jwt', { session: false }),
  upload.single('img'),
  updateKayak
);
// exporting the route
module.exports = router;
