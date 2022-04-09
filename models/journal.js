const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    countryName: {
        type: String,
        required: true
    },
    countryFlagUri: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    userUri: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema);