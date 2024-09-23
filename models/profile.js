const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
//user details
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  name: {
    type: String,
    
  },
  act: {
    type: String,
    
  },
  domain: {
    type: String,
   
  },
  subdomain: {
    type: String,
  },
  tech: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone:{
    type: String,
  },
  bio: {
    type: String,
  },
  uimg:{
     type: String,
  },
  

  //user other ac details
  github: {
    type: String,
    
  },
  linkedin: {
    type: String,
    
  }, 
  cmail: {
    type: String,
    
  },
  cphone:{
    type: String,
  },
  link: {
    type: String,
    
  },


  //user project details
  pone: {
    type: String,
    
  },
  plone: {
    type: String,
    
  },
  ptwo: {
    type: String,
    
  },
  pltwo: {
    type: String,
    
  },
  pthree: {
    type: String,
    
  },
  plthree: {
    type: String,
    
  },


//user experience(work) details
  cone: {
    type: String,
    
  },
  cdone: {
    type: String,
    
  },
  ctwo: {
    type: String,
    
  },
  cdtwo: {
    type: String,
    
  },
  cthree: {
    type: String,
    
  },
  cdthree: {
    type: String,
    
  },
  
  
});

module.exports = mongoose.model('Profile', profileSchema);
