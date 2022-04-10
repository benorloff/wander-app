const User = require('../models/user');

function index(req, res) {
    res.send('This is the user index controller function')
};

function show(req, res) {
    console.log(req.user)
    res.render('users/show', {title: 'User Profile'})
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

