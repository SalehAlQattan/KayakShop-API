// packages
const express = require('express');
// importing controllers
const { singup } = require('./controllers');
// routes
const router = express.Router();

router.post('/', singup);

// exporting the route
module.exports = router;
