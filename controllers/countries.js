const Country = require('../models/movie');
const User = require('../models/user');
const Journal = require('../models/journal');

function create(req, res) {
    Country.create(req.body, function(err, country){
        if (err) return res.redirect('/countries/new');
        console.log(country);
        res.redirect('/');
    })
}

module.exports = {
    create
};