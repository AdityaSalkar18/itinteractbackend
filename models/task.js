const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
    tt: {
        type: String,

    },
    tc:{
        type: String,

    },
    tr:{
        type: String,
    },
    tdesc: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, 
    },
});

module.exports = mongoose.model('Task', taskSchema);
