const User = require('../models/user');
const Country = require('../models/country');
const Post = require('../models/post');
const Badge = require('../models/badge');

function onboard(req, res) {
    const user = User.findById(req.user._id);
    console.log(!user.hometown);
    if (!user.hometown) {
        res.render('users/onboard', {title: 'Complete your Wander profile'})
    } else {res.redirect(`/users/${user._id}`)}
};

async function index(req, res) {
    const users = await User.find({}).exec(); 
    res.render('users/index', {title: 'Wanderers', users});
};

async function show(req, res) {
    const userCountries = await Country.find({usersVisited: req.user._id}).exec();
    const userPosts = await Post.find({user: req.user._id}).exec();
    const userBadges = await Badge.find({usersCollected: req.params.id}).exec();
    res.render('users/show', {title: 'User Profile', userCountries, userPosts, userBadges, req})
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
    onboard,
    index,
    show,
    edit,
    update,
    delete: deleteUser
}

