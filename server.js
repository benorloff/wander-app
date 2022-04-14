// load the env consts
require('dotenv').config();

const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const express = require('express');
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// MongoDB Atlas Search
const client = new MongoClient(process.env.DATABASE_URL);

// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const moment = require('moment');
moment().format();

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// mount MongoDB Atlas Search
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());

var collection;

app.get("/search", async (request, response) => {
  try {
    let result = await collection.aggregate([
      {
        "$search": {
          "autocomplete": {
            "query": `${request.query.query}`,
            "path": "name",
            "fuzzy": {
              "maxEdits": 3,
              "prefixLength": 3
            }
          }
        }
      }
    ]).toArray();
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

app.get("/get/:id", async (request, response) => {
  try {
    let result = await collection.findOne({ "_id": ObjectId(request.params.id) });
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message })
  }
});

app.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("WanderAppDb").collection("countries");
    } catch (e) {
        console.error(e);
    }
});

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

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter);
app.use('/posts', postsRouter);
app.use('/badges', badgesRouter);

// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
