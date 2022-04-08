const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String, 
        required: true
    },
    isoCode: {
        type: String,
        required: true
    },
    callingCodes: {
        type: String,
        required: true
    },
    currencyCodes: [
        {
            type: String,
            required: true
        }
    ],
    flagImageUri: {
        type: String,
        required: true
    },
    wikiDataId: {
        type: String,
        required: true
    },
    usersVisited: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Journal'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);