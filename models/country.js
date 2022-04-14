const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String, 
        required: false
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    isoCodeAlpha2: {
        type: String,
        required: true
    },
    isoCodeAlpha3: {
        type: String,
        required: true
    },
    callingCode: {
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
        required: false
    },
    numRegions: {
        type: Number,
        required: false
    },
    wikiDataId: {
        type: String,
        required: false
    },
    usersVisited: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    usersLiked: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);