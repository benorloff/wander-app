const User = require('../models/user');
const Country = require('../models/country');
const Post = require('../models/post');

function index(req, res) {
    res.send('This is the user index controller function')
};

async function show(req, res) {
    const userCountries = await Country.find({usersVisited: req.user._id}).exec();
    const userPosts = await Post.find({user: req.user._id}).exec();
    res.render('users/show', {title: 'User Profile', userCountries, userPosts})
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

