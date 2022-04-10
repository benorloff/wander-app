const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hometown: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: true
    },
    countries: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Journal'
    },
    badges: {
        type: Schema.Types.ObjectId,
        ref: 'Badge'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);