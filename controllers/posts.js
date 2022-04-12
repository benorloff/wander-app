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

async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.userUri = `/users/${req.user._id}`;
    req.body.isPrivate = !!req.body.isPrivate;
    if (req.body.isPublished === 'Publish') {
        req.body.isPublished = true;
    } else {
        req.body.isPublished = false;
    };
    try {
        Post.create(req.body, function(err, post) {
            if (err) {
                console.log(err);
                return res.redirect('/posts/new');
            }
            res.redirect(`/users/${req.user._id}`);
        })
    } catch (err) {
        console.log(err);
        return res.redirect('/posts/new');
    }
}

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