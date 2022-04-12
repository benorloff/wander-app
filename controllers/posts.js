const Post = require('../models/post');
const Country = require('../models/country');

function index(req, res) {
    res.send('This is the posts index function')
};

function allPosts(req, res) {
    res.send('This is the posts allPosts function')
};

function show(req, res) {
    res.send('This is the posts show function')
};

function newPost(req, res) {
    Country.find({}, function(err, countries) {
        res.render('posts/new', {title: 'New Post', countries})
    })
};

function create(req, res) {
    // Convert checkbox input to boolean
    console.log(req.body);
    req.body.isPrivate = !!req.body.isPrivate;
    Post.create(req.body, function(err, post) {
        if (err) {
            console.log(err);
            return res.redirect('/posts/new');
        }
        post.isPublished = req.params.isPublished;
        post.user = req.user._id;
        post.userName = req.user.name;
        post.userAvatar = req.user.avatar;
        post.userUri = `/users/${req.user._id}`;
        Country.find({name: req.body.country}, function(err, country) {
            if (err) return res.redirect('/posts/new');
            post.countryName = country.name;
            post.countryFlagUri = country.flagImageUri;
        })
        post.save();
        console.log(post);
        res.redirect(`/users/${user._id}`);
    })
};

function edit(req, res) {
    res.send('This is the posts edit function')
};

function update(req, res) {
    res.send('This is the posts update function')
};

function deletePost(req, res) {
    res.send('This is the posts deletePost function')
};

module.exports = {
    index,
    allPosts,
    show,
    new: newPost,
    create,
    edit,
    update,
    delete: deletePost
}