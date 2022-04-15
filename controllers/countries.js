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
        const usersCountries = await Country.find({usersVisited: req.user._id}).exec();
        const usersCountryCount = await usersCountries.length;
        console.log(`${usersCountryCount} <- user's country count`);
        updateBadges(req, usersCountryCount);
        res.redirect('/countries/all');
    } catch (err) {
        res.send(err);
    }
};

async function removeVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        const usersCountries = await Country.find({usersVisited: req.user._id}).exec();
        const usersCountryCount = await usersCountries.length;
        console.log(usersCountryCount);
        const userIdx = await country.usersVisited.indexOf(req.user._id);
        if (userIdx > -1) {
            country.usersVisited.splice(userIdx, 1);
            country.save();
            updateBadges(req,usersCountryCount);
            res.redirect('/countries/all');
        }
    } catch (err) {
        res.send(err);
    }
}

async function updateBadges(req, usersCountryCount) {
    console.log('hit updateBadges');
    const countryBadges = await Badge.find({name: {$regex: /^countries/}}).exec();
    countryBadges.forEach(b => {
        console.log(b);
        // Remove user from badge if their country count is below the badge's value
        if (usersCountryCount < b.numValue && b.usersCollected.includes(req.user._id) === true) {
            let userIdx = b.usersCollected.indexOf(req.user._id);
            b.usersCollected.splice(userIdx, 1);
            b.save();
            console.log(`user has been removed from ${b.name} badge`)
        } else if (usersCountryCount >= b.numValue && b.usersCollected.includes(req.user._id) === false) {
            b.usersCollected.push(req.user._id);
            b.save();
            console.log(`user has been added to ${b.name} badge`)
        }
    })
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
    create
};