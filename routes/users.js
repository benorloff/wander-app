const router = require('express').Router();
const usersCtrl = require('../controllers/users');
const countriesCtrl = require('../controllers/countries');
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.get('/:id/edit', isLoggedIn, usersCtrl.edit);
router.get('/:id/countries', countriesCtrl.index);
router.get('/:id/posts', postsCtrl.index);
router.put('/:id', isLoggedIn, usersCtrl.update);
router.delete('/:id', isLoggedIn, usersCtrl.delete);

module.exports = router;