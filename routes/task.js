const express = require('express');

const router = express.Router();
const validateToken = require('../middlewares/validateToken');
const Profile = require('../models/profile');
const Task = require('../models/task');

//Create a task

router.post('/' ,validateToken, async (req,res) =>{
 
    try {
        const userId = req.user._id;
        const {tt, tc, tr, tdesc, sd} = req.body;
        const profile = await Profile.findOne({user: userId});

        if(!profile){
            return res.status(404).json({message: 'Profile not found'});
        }

        const newTask = new Task({
            user: userId,
            name: profile.name,
            sd,
            tt,
            tc,
            tr,
            tdesc,

        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({error: 'Could not create update'});  
    }
});

// Get all tasks
router.get('/', async (req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({error: 'Could not fetch task'});   
    }
})

// Get all updates for the authenticated user
router.get('/user' , validateToken, async (req,res) => {
    try {
        const userId = req.user._id;
  
        const tasks = await Task.find({user: userId});

        if(!tasks || tasks.length === 0){
            return res.status(404).json({message: 'No task found for this user'});
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({error:'Could not fetch tasks'});
        
    }
});

// Get update by ID
router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({error: 'Tasks not found'});
        }
        
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({error: 'Cound not fetch task details'})   
    }
});

//Edit an update
router.patch('/:id', validateToken, async (req,res) => {
    try {

        const {id} = req.params;
        const {tt,tc,tr,tdesc} = req.body;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({error: 'Task not found'});
        }

        if(task.user.toString() !== req.user.userId){
            return res.status(403).json({message: 'Unauthorized'});
        }

        task.tt = tt || task.tt;
        task.tc = tc || task.tc;
        task.tr = tr || task.tr;
        task.tdesc = tdesc || task.tdesc;

        await task.save();

        res.status(200).json(task);
  
    } catch (error) {
        res.status(500).json({error: 'Could not update'});  
    }
});

//Delete an update
router.delete('/:id', validateToken, async (req,res) => {
    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({error: 'Update not found'});
        }

        if(task.user.toString() !== req.user.userId){
            return res.status(403).json({message: 'Unauthorized'});
        }
        
        await task.delete();
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'Could not delete Task'});
        
    }
});


module.exports = router;