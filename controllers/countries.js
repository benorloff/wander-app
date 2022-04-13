const axios = require('axios');
const Country = require('../models/country');
const User = require('../models/user');
const Post = require('../models/post');
const Badge = require('../models/badge');

async function index(req, res) {
    const userCountries = await Country.find({usersVisited: req.user._id}).exec();
    res.render('users/countries', {title: 'My Countries', userCountries})
};

function allCountries(req, res) {
    Country.find({}, function (err, countries) {
        res.render('countries/all', {title: 'All Countries', countries})
    })
};

async function show(req, res) {
    const country = await Country.findById(req.params.id);
    const posts = await Post.find({country: req.params.id}).exec();
    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country.isoCodeAlpha2}`,
        headers: {
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY
        }
      };
    axios.request(options).then(function (response) {
        res.render('countries/show', {title: country.name, country, posts, data: response.data.data});
    }).catch(function (error) {
        console.error(error);
    });
    // // Add response data to db
    // if (country.capital === "") {
    //     country.capital = response.data.capital;
    //     country.callingCode = response.data.callingCode;
    //     country.currencyCodes = response.data.currencyCodes;
    //     country.flagImageUri = response.data.flagImageUri;
    //     country.numRegions = response.data.numRegions;
    //     country.wikiDataId = response.data.wikiDataId;
    //     country.save();
    // }
};

async function addVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        country.usersVisited.push(req.user._id);
        country.save();
        res.redirect('/countries/all');
    } catch (err) {
        res.send(err);
    }
};

async function removeVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        const userIdx = await country.usersVisited.indexOf(req.user._id);
        if (userIdx > -1) {
            country.usersVisited.splice(userIdx, 1);
            country.save();
            res.redirect('/countries/all');
        }
    } catch (err) {
        res.send(err);
    }
}

function newCountry(req, res) {
    res.render('countries/new', {title: 'Add Country'})
}

function create(req, res) {
    Country.create(req.body, function(err, country){
        if (err) {
            console.log(err);
            return res.redirect('/countries/new');
        }
        console.log(country);
        res.redirect('/');
    })
}

module.exports = {
    index,
    allCountries,
    show,
    addVisitor,
    removeVisitor,
    new: newCountry,
    create
};