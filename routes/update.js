const express = require('express');

const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const Profile = require('../models/profile');
const Update = require('../models/update');

// Create a new update
router.post('/', validateToken, async (req, res) => {
  try {

    const  userId  = req.user._id; 
    const { desc,sd } = req.body;
    
    // console.log(req.user)

   
    const profile = await Profile.findOne({ user: userId });

    // console.log(profile)

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const newUpdate = new Update({
      user: userId,
      name: profile.name,
      sd,
      desc,
      
    });

    await newUpdate.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Could not create update' });
  }
});

// Get all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find();
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch updates' });
  }
});

// Get all updates for the authenticated user
router.get('/user', validateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Ensure `req.user` is set by `validateToken`

    // Fetch updates for the authenticated user
    const updates = await Update.find({ user: userId });

    if (!updates || updates.length === 0) {
      return res.status(404).json({ message: 'No updates found for this user' });
    }

    res.status(200).json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: 'Could not fetch updates' });
  }
});

// Get update by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Update.findById(id);

    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch update details' });
  }
});


// Edit an update
router.patch('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;

    const update = await Update.findById(id);

    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }

   
    if (update.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    update.desc = desc || update.desc;
    await update.save();

    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: 'Could not update update' });
  }
});

// Delete an update
router.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const update = await Update.findById(id);

    if (!update) {
      return res.status(404).json({ error: 'Update not found' });
    }

    
    if (update.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await update.delete();
    res.status(200).json({ message: 'Update deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete update' });
  }
});

module.exports = router;
