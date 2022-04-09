const express = require('express');
const router = express.Router();
const countriesCtrl = require('../controllers/countries');
const isLoggedIn = require('../config/auth');

router.post('/countries', isLoggedIn, countriesCtrl.create);

module.exports = router;


