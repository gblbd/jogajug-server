const express = require('express');

const router = express.Router();

// import controller
const { readWeatherDetails } = require('../controllers/weatherReport');
const { authenticate } = require('../middleware/authurize');
// import validators

router.get('/read-weather-report', readWeatherDetails);

module.exports = router;
