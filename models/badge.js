const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    numValue: {
        type: Number,
        required: true
    },
    badgeImageUri: {
        type: String,
        required: true
    },
    usersCollected: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

module.exports = mongoose.model('Badge', badgeSchema);