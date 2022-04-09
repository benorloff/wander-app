const express = require('express');
const router = express.Router();
const journalsCtrl = require('../controllers/journals');
const isLoggedIn = require('../config/auth');

// Display all of an authenticated user's journals
router.get('/', isLoggedIn, journalsCtrl.index);
// Display all public journals by all users
router.get('/all', journalsCtrl.allJournals);
router.get('/:id', journalsCtrl.show);
router.get('/new', isLoggedIn, journalsCtrl.new);
router.post('/', isLoggedIn, journalsCtrl.create);
router.get('/:id/edit', isLoggedIn, journalsCtrl.edit);
router.put('/:id', isLoggedIn, journalsCtrl.update);
router.delete('/:id', isLoggedIn, journalsCtrl.delete);


module.exports = router;