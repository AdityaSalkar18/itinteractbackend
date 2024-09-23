const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');

const Comment = require('../models/comment'); 
const Profile = require('../models/profile'); 

// Route to add a comment to an update
router.post('/', validateToken, async (req, res) => {
    try {
        const userId = req.user._id; // Getting the authenticated user's ID
        const { uid, msg } = req.body; // Getting the update ID and comment message

        
        if (!uid || !msg) {
            return res.status(400).json({ error: 'Update ID and message are required' });
        }

       
        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

       
        const newComment = new Comment({
            user: userId,
            name: profile.name, 
            uid, 
            msg,
        });

        
        await newComment.save();
        res.status(201).json(newComment);

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error adding comment' });
    }
});

//Get all comments
router.get('/',async (req,res) => {
    try {
        const comment = await Comment.find();
        res.status(200).json(comment);
        
    } catch (error) {
        res.status(500).json({error: 'Could not fetch task'});   
        
    }
})

//Get all comments
router.get('/:uid',async (req,res) => {
    try {
        const {uid} = req.params;
        const comment = await Comment.findById(uid);

        if(!comment){
            return res.status(404).json({error: 'Comment not found'});
        }

        res.status(200).json(comment);
        
    } catch (error) {
        res.status(500).json({error: 'Could not fetch comment'});   
        
    }
})


module.exports = router;
