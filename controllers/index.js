const Post = require('../models/post');

async function index(req, res) {
    const posts = await Post.find({}).exec();
    res.render('home', {title: 'Wander', posts});
}

module.exports = {
    index
}