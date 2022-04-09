const express = require('express');
const router = express.Router();
const countriesCtrl = require('../controllers/countries');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, countriesCtrl.newCountry);
router.post('/', isLoggedIn, countriesCtrl.create);

module.exports = router;


