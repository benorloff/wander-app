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
    res.send('This is the country show function')
};

function addVisitor(req, res) {
    res.send('This is the country addVisitor function')
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