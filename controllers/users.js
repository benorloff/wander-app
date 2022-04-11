const User = require('../models/user');
const Country = require('../models/country');

function index(req, res) {
    res.send('This is the user index controller function')
};

function show(req, res) {
    console.log(req.user);
    Country.find({usersVisited: req.user.id}, function (err, countries) {
        console.log(countries);
        res.render('users/show', {title: 'User Profile', countries})
    })
};

function edit(req, res) {
    res.send('This is the user edit controller function')
};

function update(req, res) {
    res.send('This is the user update controller function')
};

function deleteUser(req, res) {
    res.send('This is the user deleteUser controller function')
};

module.exports = {
    index,
    show,
    edit,
    update,
    delete: deleteUser
}

