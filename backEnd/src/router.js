const express = require('express');
const tasksController = require('./controllers/taskController');
const taskmiddleware = require('./middleware/tasksMiddleware');
const router = express.Router();


router.get('/tasks', tasksController.getAll);
router.post('/tasks',taskmiddleware.validateBody, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',taskmiddleware.validateUpdate, tasksController.updateTask);    



module.exports = router;