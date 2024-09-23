const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  sender:{
    type:String,
    require: true

  },
  reciverid:{
    
    type:String

  },
  recivername:{
    
    type:String

  },
  msg:{
    type: String,
  },

})

module.exports = mongoose.model('Notification', notificationSchema);