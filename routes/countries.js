const express = require('express');
const router = express.Router();
const countriesCtrl = require('../controllers/countries');
const isLoggedIn = require('../config/auth');

// Display all of an authenticated user's countries
router.get('/', isLoggedIn, countriesCtrl.index);
// Display all countries
router.get('/all', countriesCtrl.allCountries);
// Display a single country's view
router.get('/:id', countriesCtrl.show);
// Add a user's id to a country's usersVisited array
router.post('/:id', isLoggedIn, countriesCtrl.addVisitor);
// Display the form for adding a new country (this may be deprecated)
router.get('/new', isLoggedIn, countriesCtrl.new);
// Create the new country (this may be deprecated)
router.post('/', isLoggedIn, countriesCtrl.create);

module.exports = router;


