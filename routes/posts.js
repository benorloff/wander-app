const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, postsCtrl.new);
router.post('/', isLoggedIn, postsCtrl.create);
// Display all of an authenticated user's journals
router.get('/', isLoggedIn, postsCtrl.index);
// Display all public journals by all users
router.get('/all', postsCtrl.allPosts);
router.get('/:id', postsCtrl.show);
router.get('/:id/edit', isLoggedIn, postsCtrl.edit);
router.put('/:id', isLoggedIn, postsCtrl.update);
router.delete('/:id', isLoggedIn, postsCtrl.delete);


module.exports = router;