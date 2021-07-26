// packages
const express = require('express');
const passport = require('passport');

// importing controllers
const { checkout } = require('./controllers');

// routes
const router = express.Router();

router.post(
  '/checkout',
  passport.authenticate('jwt', { session: false }),
  checkout
);

// exporting the route
module.exports = router;
