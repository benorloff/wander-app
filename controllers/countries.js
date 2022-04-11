const Country = require('../models/country');
const User = require('../models/user');
const Journal = require('../models/post');

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

// async function addVisitor(req, res) {
//     try {
//         console.log('country hit');
//         const foundCountry = await Country.findById(req.params.id);
//         const foundUser = await User.findById(req.user._id);
//         foundCountry.usersVisited.push(req.user._id);
//         foundCountry.save();
//         foundUser.countries.push(foundCountry._id);
//         foundUser.save();
//         res.render('/countries/all', {title: 'Countries'});
//     }
//     catch(err) {
//         res.send(err)
//     }
// };

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