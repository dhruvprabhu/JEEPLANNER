const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');

// GET tasks by category and priority (Authenticated)
router.get('/', authenticateToken, taskController.getTasksByCategoryAndPriority);


// Create a task (Authenticated)
router.post('/', authenticateToken, taskController.createTask);

// Update a task (Authenticated)
router.put('/:id', authenticateToken, taskController.updateTask);

// Delete a task (Authenticated)
router.delete('/:id', authenticateToken, taskController.deleteTask);

// Complete task and delete it (Authenticated)
router.put('/complete/:id', authenticateToken, taskController.completeTask);

// To send notification - No authentication required
router.get('/tasks-by-priority', taskController.getTasksByPriorityForNotification);



module.exports = router;
