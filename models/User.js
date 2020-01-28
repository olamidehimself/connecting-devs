const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profile_picture: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = User = mongoose.model('user', UserSchema);