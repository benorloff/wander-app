const Country = require('../models/country');
const User = require('../models/user');
const Journal = require('../models/journal');

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
    newCountry,
    create
};