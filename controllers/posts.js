const Post = require('../models/post');
const Country = require('../models/country');

async function index(req, res) {
    const userPosts = await Post.find({user: req.user._id}).exec();
    res.render('users/posts', {title: 'My Posts', userPosts})
};

function allPosts(req, res) {
    Post.find({}, function(err, posts) {
        res.render('posts/all', {title: 'All Posts', posts})
    })
};

async function show(req, res) {
    const post = await Post.findById(req.params.id).exec();
    const country = await Country.findById(post.country).exec();
    res.render('posts/show', {title: post.title, post, country})
};

function newPost(req, res) {
    Country.find({}, function(err, countries) {
        res.render('posts/new', {title: 'New Post', countries})
    })
};

async function create(req, res) {
    // Get the country doc so we can update req.body
    const country = await Country.findById(req.body.country).exec();
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.userUri = `/users/${req.user._id}`;
    req.body.isPrivate = !!req.body.isPrivate;
    req.body.countryName = country.name;
    req.body.countryFlagUri = country.flagImageUri;
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

async function edit(req, res) {
    const post = await Post.findById(req.params.id);
    const countries = await Country.find({}).exec();
    res.render('posts/edit', {title: post.title, post, countries})
};

async function update(req, res) {
    req.body.isPrivate = !!req.body.isPrivate;
    if (req.body.isPublished === 'Publish') {
        req.body.isPublished = true;
    } else {
        req.body.isPublished = false;
    };
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    post.country = req.body.country;
    post.isPublished = req.body.isPublished;
    post.isPrivate = req.body.isPrivate;
    post.save();
    res.redirect(`/posts/${req.params.id}`);
};

async function deletePost(req, res) {
    const post = await Post.findById(req.params.id);
    const userPosts = await Post.find({user: post.user}).exec();
    console.log(post.user);
    if (!post.user.equals(req.user._id)) return res.redirect(`/posts/${req.params.id}`);
    post.remove();
    userPosts.save();
    res.render('users/posts', {title: `${req.user.name}'s Posts on Wander`, userPosts});
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