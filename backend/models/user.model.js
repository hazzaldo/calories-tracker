const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 8,
        trim: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = Users;