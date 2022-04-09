const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOne({googleId: profile.id}, function(err, user){
      // If user is defined, they've logged in before
      if (user) return cb(null, user);
      if (err) return cb(err);
      // If user is not found, we create a user
      User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }, function(err, createdUser){
        if(createdUser) return cb(null, createdUser)
        if(err) return cb(err)
      })
    })
  })
  );

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    if(err) return cb(err);
    cb(null, user);
  })
});



