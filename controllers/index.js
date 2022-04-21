const Post = require('../models/post');

async function index(req, res) {
    const posts = await Post.find({ isPrivate: false }).sort({createdAt: 'desc'}).limit(5);
    res.render('home', {title: 'Wander', posts});
}

module.exports = {
    index
}