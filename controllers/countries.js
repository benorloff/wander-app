const axios = require('axios');
const Country = require('../models/country');
const User = require('../models/user');
const Journal = require('../models/post');

const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US',
    headers: {
      'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY
    }
  };

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
    const options = {
        method: 'GET',
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${country.isoCodeAlpha2}`,
        headers: {
          'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
          'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY
        }
      };
    axios.request(options).then(function (response) {
        console.log(response.data.data);
        res.render('countries/show', {title: country.name, country, data: response.data.data});
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

function addVisitor(req, res) {
    Country.findById(req.params.id).exec(function(err, foundCountry) {
        console.log(req.params.id);
        console.log(foundCountry);
        if(err) {
            res.send(err);
        } else {
            foundCountry.usersVisited.push(req.user._id);
            foundCountry.save();
            User.findById(req.user._id).exec(function(err, foundUser) {
                console.log(foundUser);
                foundUser.countries.push(req.params.id);
                foundUser.save();
            })
            console.log(foundCountry);
            res.redirect('/countries/all');
        }
    })
};

function removeVisitor(req, res) {
    Country.findById(req.params.id).exec(function(err, foundCountry) {
        if(err) {
            res.send(err);
        } else {
            const userIdx = foundCountry.usersVisited.indexOf(req.user._id);
            console.log(`${userIdx} <- user index in array`);
            if (userIdx > -1) {
                foundCountry.usersVisited.splice(userIdx, 1);
                foundCountry.save();
                User.findById(req.user._id).exec(function(err, foundUser) {
                    const countryIdx = foundUser.countries.indexOf(foundCountry._id);
                    foundUser.countries.splice(countryIdx, 1);
                    foundUser.save();
                    res.redirect('/countries/all');
                })
            }
        }
    })
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