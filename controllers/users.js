const User = require('../models/user');
const Country = require('../models/country');
const Post = require('../models/post');
const Badge = require('../models/badge');

async function index(req, res) {
    const users = await User.find({}).exec(); 
    res.render('users/index', {title: 'Wanderers', users});
};

async function show(req, res) {
    const userCountries = await Country.find({usersVisited: req.user._id}).exec();
    const userPosts = await Post.find({user: req.user._id}).exec();
    const userBadges = await Badge.find({usersCollected: req.params.id}).exec();
    res.render('users/show', {title: 'User Profile', userCountries, userPosts, userBadges})
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

