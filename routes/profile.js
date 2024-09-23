const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const validateToken = require('../middlewares/validateToken');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Multer configuration with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => Date.now() + path.extname(file.originalname),
  },
});

const upload = multer({ storage: storage });

// Create a new profile with image upload
router.post('/', validateToken, upload.single('image'), async (req, res) => {
  try {
    const {
      name, email, bio, act, domain, subdomain,tech, phone, github, linkedin, cmail,
      cphone, link, pone, plone, ptwo, pltwo, pthree, plthree, cone, cdone,
      ctwo, cdtwo, cthree, cdthree
    } = req.body;

    const profile = new Profile({
      user: req.user._id,
      name,
      email,
      bio,
      act,
      domain,
      subdomain,
      tech,
      phone,
      uimg: req.file ? req.file.path : undefined, // Save the uploaded image URL
      github,
      linkedin,
      cmail,
      cphone,
      link,
      pone,
      plone,
      ptwo,
      pltwo,
      pthree,
      plthree,
      cone,
      cdone,
      ctwo,
      cdtwo,
      cthree,
      cdthree
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Could not create profile' });
  }
});

// Fetch all user profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch profiles' });
  }
});




router.get('/complete/student', async (req, res) => {
  try {
    const requiredFields = ['name', 'email', 'act', 'domain', 'subdomain'];

    
    const studentProfiles = await Profile.find({ act: 'Student' });

    
    const completeStudentProfiles = studentProfiles.filter(profile =>
      requiredFields.every(field => profile[field] !== undefined && profile[field] !== null && profile[field] !== '')
    );

    res.status(200).json(completeStudentProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch student profiles' });
  }
});


router.get('/complete/user', async (req, res) => {
  try {
    const requiredFields = ['name', 'email', 'act', 'domain', 'subdomain'];

    
    const userProfiles = await Profile.find({ act: 'User' });

    
    const completeUserProfiles = userProfiles.filter(profile =>
      requiredFields.every(field => profile[field] !== undefined && profile[field] !== null && profile[field] !== '')
    );

    res.status(200).json(completeUserProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch user profiles' });
  }
});


// Get user profile data by user ID
router.get('/get-my-profile', validateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get profile by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch profile details' });
  }
});

// Edit user profile with image upload
router.patch('/edit-my-profile', validateToken, upload.single('image'), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    const {
      name, email, bio, act, domain, subdomain,tech, phone, github, linkedin, cmail,
      cphone, link, pone, plone, ptwo, pltwo, pthree, plthree, cone, cdone,
      ctwo, cdtwo, cthree, cdthree
    } = req.body;

    profile.name = name || profile.name;
    profile.email = email || profile.email;
    profile.bio = bio || profile.bio;
    profile.act = act || profile.act;
    profile.domain = domain || profile.domain;
    profile.subdomain = subdomain || profile.subdomain;
    profile.tech = tech || profile.tech;
    profile.phone = phone || profile.phone;
    
    profile.github = github || profile.github;
    profile.linkedin = linkedin || profile.linkedin;
    profile.cmail = cmail || profile.cmail;
    profile.cphone = cphone || profile.cphone;
    profile.link = link || profile.link;

    profile.pone = pone || profile.pone;
    profile.plone = plone || profile.plone;
    profile.ptwo = ptwo || profile.ptwo;
    profile.pltwo = pltwo || profile.pltwo;
    profile.pthree = pthree || profile.pthree;
    profile.plthree = plthree || profile.plthree;

    profile.cone = cone || profile.cone;
    profile.cdone = cdone || profile.cdone;
    profile.ctwo = ctwo || profile.ctwo;
    profile.cdtwo = cdtwo || profile.cdtwo;
    profile.cthree = cthree || profile.cthree;
    profile.cdthree = cdthree || profile.cdthree;

    if (req.file) {
      profile.uimg = req.file.path; // Update the image URL if a new image is uploaded
    }

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
