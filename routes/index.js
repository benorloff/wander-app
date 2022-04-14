const router = require('express').Router();
const passport = require('passport');
const usersCtrl = require('../controllers/users');
const isLoggedIn = require('../config/auth');

// The root route renders our only view
router.get('/', function(req, res) {
  res.render('home', { title: 'Wander App'});
});

// The user onboarding route
router.get('/onboard', isLoggedIn, usersCtrl.onboard)

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/onboard', // where do you want the client to go after you login 
    failureRedirect : '/' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
