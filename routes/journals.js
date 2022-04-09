const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');
const isLoggedIn = require('../config/auth');



module.exports = router;