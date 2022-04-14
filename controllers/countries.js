const Country = require('../models/country');
const Post = require('../models/post');
const Badge = require('../models/badge');

async function index(req, res) {
    const userCountries = await Country.find({usersVisited: req.user.id}).exec();
    res.render('countries/index', {title: 'My Countries', userCountries})
};

function allCountries(req, res) {
    Country.find({}, function (err, countries) {
        res.render('countries/all', {title: 'All Countries', countries})
    })
};

async function show(req, res) {
    const country = await Country.findById(req.params.id);
    const posts = await Post.find({country: req.params.id}).exec();
    const lng = await parseFloat(country.longitude);
    const lat = await parseFloat(country.latitude);
    res.render('countries/show', {title: country.name, country, lng, lat, posts});
};

async function addVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        country.usersVisited.push(req.user._id);
        country.save();
        updateBadges(req);
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

async function updateBadges(req) {
    console.log('hit updateBadges');
    const countries = await Country.find({usersVisited: req.user._id}).exec();
    console.log(`${countries} <- user's countries`);
    const countryCount = await countries.length;
    console.log(`${countryCount} <- user's country count`);
    const countryBadges = await Badge.find({name: {$regex: /^countries/}}).exec();
    console.log(`${countryBadges} <- country badges`);
    switch (true) {
        case (countryCount < 1):
            removeBadges(req, countryBadges, countryCount);
        case (countryCount >= 1 && countryCount < 5):
            const countries1 = await Badge.findOne({name: 'countries1'});
            countries1.usersCollected.push(req.user._id);
            countries1.save();
            removeBadges(req, countryBadges, countryCount);
            break;
        case (countryCount >= 5 && countryCount < 10):
            const countries5 = await Badge.findOne({name: 'countries5'});
            countries5.usersCollected.push(req.user._id);
            countries5.save();
            removeBadges(req, countryBadges, countryCount);
            break;
        case (countryCount >= 10 && countryCount < 25):
            const countries10 = await Badge.findOne({name: 'countries10'});
            countries10.usersCollected.push(req.user._id);
            countries10.save();
            removeBadges(req, countryBadges, countryCount);
            break;
        case (countryCount >= 25):
            const countries25 = await Badge.findOne({name: 'countries25'});
            countries25.usersCollected.push(req.user._id);
            countries25.save();
            removeBadges(req, countryBadges, countryCount);
            break;
    }
}

// This function is only invoked if user removes a country 
async function removeBadges(req, countryBadges, countryCount) {
    // Find country badges that the user no longer qualifies for
    const dqBadges = await Badge.aggregate([
        { $match: { name: { $regex: /^countries/ }, numValue: { $gt: countryCount } } }
    ]).exec();
    console.log(`${dqBadges} <- dqBadges`);
    // Loop through any badges the user no longer qualifies for
    dqBadges.forEach(badge => {
        // Assign the user's index
        let userIdx = badge.usersCollected.indexOf(req.user._id);
        // Confirm user is in array
        if (userIdx > -1) {
            badge.usersCollected.splice(userIdx, 1);
            badge.save();
        } else {return}
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