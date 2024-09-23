const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sd: {
        type: String,

    },
    desc: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, 
    },

  
});

module.exports = mongoose.model('Update', updateSchema);
