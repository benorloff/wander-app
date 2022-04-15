const User = require('../models/user');
const Country = require('../models/country');
const Post = require('../models/post');
const Badge = require('../models/badge');
const moment = require('moment');

function onboard(req, res) {
    const user = User.findById(req.user._id).exec();
    console.log(req.user.hometown === undefined);
    if (req.user.hometown === undefined) {
        res.render('users/onboard', {title: 'Complete your Wander profile'})
    } else {res.redirect(`/users/${req.user._id}`)}
};

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

async function countries(req, res) {
    const userCountries = await Country.find({usersVisited: req.user._id}).exec();
    res.render('users/countries', {title: 'My Countries', userCountries})
}

async function edit(req, res) {
    const user = await User.findById(req.user._id).exec();
    const dateFormatted = moment(user.birthdate).format('YYYY-MM-DD');
    res.render('users/edit', {title: 'Edit Your Profile', user, dateFormatted});
};

async function update(req, res) {
    const user = await User.findOne({_id: req.user._id});
    user.name = req.body.name;
    user.birthdate = req.body.birthdate;
    user.hometown = req.body.hometown;
    user.bio = req.body.bio;
    user.save().then(function() {
        res.redirect(`/users/${user._id}`);
    }).catch(function(err) {
        return next(err);
    })
};

function deleteUser(req, res) {
    res.send('This is the user deleteUser controller function')
};

module.exports = {
    onboard,
    index,
    show,
    countries,
    edit,
    update,
    delete: deleteUser
}

