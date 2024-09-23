const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const Profile = require('../models/profile');
const Notification = require('../models/notification');

router.post('/',validateToken, async(req,res) => {
    try {
        const userId = req.user._id;
        const {reciverid,recivername,msg} = req.body;

        const profile = await Profile.findOne({user: userId});

        if(!profile){
            return res.status(404).json({message: 'Profile not found'});

        }
        //  console.log(profile)
        

        const newNotification = new Notification({
            user: userId,
            sender: profile.name,
            reciverid,
            recivername,
            msg,

        });

        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        res.status(500).json({ error: 'Could not create update' });
        
    }
});

router.get('/', async (req, res)=>{
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
        

    } catch (error) {
        res.status(500).json({error:'Could not fetch notification'});
 
    }
    

});

router.get('/recived-notification', validateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        
        const notifications = await Notification.find({ reciverid: profile._id });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch notifications' });
    }
});
  
router.get('/send-notification', validateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        const profile = await Profile.findOne({ user: userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        
        const notifications = await Notification.find({ sender: profile.name });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch notifications' });
    }
});
  




module.exports = router;