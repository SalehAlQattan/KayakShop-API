// packages
const express = require('express');
const passport = require('passport');
// importing controllers
const { singup, singin } = require('./controllers');
// routes
const router = express.Router();

router.post('/signup', singup);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  singin
);

// exporting the route
module.exports = router;
