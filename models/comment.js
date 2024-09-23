const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    uid:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Automatically set to the current date/time
    },
});

module.exports = mongoose.model('Comment', commentSchema);
