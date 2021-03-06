// load the env consts
require('dotenv').config();

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const moment = require('moment');

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const postsRouter = require('./routes/posts');
const badgesRouter = require('./routes/badges');

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// mount the session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Route to the TinyMCE Node module
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);
app.use('/posts', postsRouter);
app.use('/badges', badgesRouter);

// invalid request, send 404 page
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
