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
    try {
        const country = await Country.findById(req.params.id);
        console.log(country)
        const posts = await Post.find({country: req.params.id}).exec();
        console.log(posts)
        const lng = parseFloat(country.longitude);
        console.log(lng)
        const lat = parseFloat(country.latitude);
        console.log(lat)
        res.render('countries/show', {title: country.name, country, lng, lat, posts, req}); 
    } catch (err) {
        res.send(err);
    }
};

async function addVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        country.usersVisited.push(req.user._id);
        await country.save();
        const usersCountries = await Country.find({usersVisited: req.user._id}).exec();
        const usersCountryCount = await usersCountries.length;
        updateBadges(req, usersCountryCount);
        res.redirect('/countries/all');
    } catch (err) {
        res.send(err);
    }
};

async function removeVisitor(req, res) {
    try {
        const country = await Country.findById(req.params.id);
        console.log(`${req.user._id} <- user.id to remove`)
        if (country.usersVisited.includes(req.user._id)) {
            country.usersVisited.remove(req.user._id);
            await country.save();
        }
        const usersCountries = await Country.find({usersVisited: req.user._id}).exec();
        const usersCountryCount = await usersCountries.length;
        updateBadges(req, usersCountryCount);
        res.redirect('/countries/all');
    } catch (err) {
        res.send(err);
    }
}

async function updateBadges(req, usersCountryCount) {
    console.log('hit updateBadges function');
    console.log(usersCountryCount);
    const countryBadges = await Badge.find({name: {$regex: /^countries/}}).exec();
    console.log(`${countryBadges} <- country badges`)
    await countryBadges.forEach(b => {
        // Remove user from badge if their country count is below the badge's value
        if (usersCountryCount < b.numValue && b.usersCollected.includes(req.user._id) === true) {
            b.usersCollected.remove(req.user._id);
            console.log('user REMOVED from badge')
        } else if (usersCountryCount >= b.numValue && b.usersCollected.includes(req.user._id) === false) {
            b.usersCollected.push(req.user._id);
            console.log('user ADDED to badge')
        }
        b.save();
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