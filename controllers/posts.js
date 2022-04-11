const Post = require('../models/post');

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
    res.render('posts/new', {title: 'New Post'})
};

function create(req, res) {
    res.send('This is the posts create function')
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