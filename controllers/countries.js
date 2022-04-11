const Country = require('../models/country');
const User = require('../models/user');
const Journal = require('../models/journal');

function index(req, res) {
    res.send('This is the country index function')
};

function allCountries(req, res) {
    Country.find({}, function (err, countries) {
        res.render('countries/all', {title: 'All Countries', countries})
    })
};

function show(req, res) {
    Country.findById(req.params.id)
    .exec(function(err, country) {
        res.render('countries/show', {title: country.name, country})
    })
};

function addVisitor(req, res) {
    Country.findById(req.params.id, function(err, foundCountry) {
        if(err) {
            res.send(err);
        } else {
            foundCountry.usersVisited += user._id;
            res.render('countries/all')
        }
    })
};

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
    new: newCountry,
    create
};