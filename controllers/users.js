const User = require('../models/user');

function index(req, res) {
    res.send('This is the user index controller function')
};

function show(req, res) {
    res.send('This is the user show controller function')
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

