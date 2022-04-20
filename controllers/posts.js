const Post = require('../models/post');
const Country = require('../models/country');
const Badge = require('../models/badge');

async function index(req, res) {
    const posts = await Post.find({user: req.user._id}).exec();
    res.render('users/posts', {title: 'My Posts', posts})
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
    const country = await Country.findOne({name: req.body.country}).exec();
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.userUri = `/users/${req.user._id}`;
    req.body.isPrivate = !!req.body.isPrivate;
    req.body.country = country._id;
    req.body.countryName = country.name;
    req.body.countryFlagUri = `/images/flags/${country.isoCodeAlpha2}.png`;
    if (req.body.isPublished === 'Publish') {
        req.body.isPublished = true;
    } else {
        req.body.isPublished = false;
    };
    console.log(req.body);
    try {
        Post.create(req.body).then(function(err, post) {
            const usersPosts = Post.find({user: req.user._id}).exec();
            const usersPostCount = usersPosts.length;
            updateBadges(req, usersPostCount);
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
    await Post.findByIdAndRemove(req.params.id);
    const posts = await Post.find({user: req.user._id});
    const usersPostCount = posts.length;
    updateBadges(req, usersPostCount);
    res.render('users/posts', {title: `${req.user.name}'s Posts on Wander`, posts});
};

async function updateBadges(req, usersPostCount) {
    console.log('hit updateBadges');
    const journalBadges = await Badge.find({name: {$regex: /^journals/}}).exec();
    journalBadges.forEach(b => {
        console.log(b);
        // Remove user from badge if their post count is below the badge's value
        if (usersPostCount < b.numValue && b.usersCollected.includes(req.user._id) === true) {
            let userIdx = b.usersCollected.indexOf(req.user._id);
            b.usersCollected.splice(userIdx, 1);
            b.save();
            console.log(`user has been removed from ${b.name} badge`)
        } else if (usersPostCount >= b.numValue && b.usersCollected.includes(req.user._id) === false) {
            b.usersCollected.push(req.user._id);
            b.save();
            console.log(`user has been added to ${b.name} badge`)
        }
    })
}

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