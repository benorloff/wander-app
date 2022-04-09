const express = require('express');
const router = express.Router();
const badgesCtrl = require('../controllers/badges');
const isLoggedIn = require('../config/auth');

// Add a user's id to the badge's usersCollected array
router.post('/:id', isLoggedIn, badgesCtrl.addCollector);

module.exports = router;