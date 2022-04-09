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
        required: false
    },
    currencyCodes: [
        {
            type: String,
            required: false
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