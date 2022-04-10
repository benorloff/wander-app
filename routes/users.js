const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const isLoggedIn = require('../config/auth');

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.get('/:id/edit', isLoggedIn, usersCtrl.edit);
router.put('/:id', isLoggedIn, usersCtrl.update);
router.delete('/:id', isLoggedIn, usersCtrl.delete);

module.exports = router;