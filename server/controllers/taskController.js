const pool = require('../config/database');
const moment = require('moment-timezone');
const path = require('path');
const ExcelJS = require('exceljs');


// Helper function to adjust timestamps to the desired timezone
const adjustTimestamp = (rows) => {
    return rows.map(row => ({
        ...row,
        created_at: moment(row.created_at).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ssZ')
    }));
};

// Get tasks by category and priority for authenticated user
const getTasksByCategoryAndPriority = async (req, res) => {
    const userId=req.user[0].user_id;

    try {
        const categories = ['Physics', 'Chemistry', 'Maths'];
        const allTasks = [];

        for (const category of categories) {
            const [tasks] = await pool.query('SELECT * FROM Tasks WHERE user_id = ? AND category = ? ORDER BY FIELD(priority, "high", "medium", "low"), created_at ASC', [userId, category]);
            const adjustedTasks = adjustTimestamp(tasks);

            allTasks.push({
                category,
                tasks: adjustedTasks
            });
        }

        res.json(allTasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a task for authenticated user
const createTask = async (req, res) => {
    const userId = req.user[0].user_id;
    const { category, task, priority, deadline } = req.body;

    try {
        if (!['Physics', 'Chemistry', 'Maths'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        if (!['high', 'medium', 'low'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority' });
        }

        const createdAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        const formattedDeadline = deadline ? moment(deadline).utc().format('YYYY-MM-DD HH:mm:ss') : null;

        const [result] = await pool.query(
            'INSERT INTO Tasks (user_id, category, task, priority, created_at, deadline) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, category, task, priority, createdAt, formattedDeadline]
        );

        const createdAtInTimezone = moment(createdAt).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ssZ');

        res.status(201).json({ task_id: result.insertId, category, task, priority, created_at: createdAtInTimezone, deadline: formattedDeadline });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update a task for authenticated user
const updateTask = async (req, res) => {
    const userId = req.user[0].user_id;
    const { id } = req.params;
    const { category, task, priority, deadline } = req.body;

    try {
        if (!['Physics', 'Chemistry', 'Maths'].includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        if (!['high', 'medium', 'low'].includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority' });
        }

        const formattedDeadline = deadline ? moment(deadline).utc().format('YYYY-MM-DD HH:mm:ss') : null;

        await pool.query(
            'UPDATE Tasks SET category = ?, task = ?, priority = ?, deadline = ? WHERE task_id = ? AND user_id = ?',
            [category, task, priority, formattedDeadline, id, userId]
        );
        const [updatedTask] = await pool.query('SELECT * FROM Tasks WHERE task_id = ? AND user_id = ?', [id, userId]);

        if (!updatedTask.length) {
            return res.status(404).json({ message: 'Task not found or no changes applied' });
        }

        res.json(updatedTask[0]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Delete a task for authenticated user
const deleteTask = async (req, res) => {
    const userId=req.user[0].user_id;
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM Tasks WHERE task_id = ? AND user_id = ?', [id, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Complete a task for authenticated user
const completeTask = async (req, res) => {
    const userId=req.user[0].user_id;
    const { id } = req.params;

    try {
        await pool.query('UPDATE Tasks SET status = "completed" WHERE task_id = ? AND user_id = ?', [id, userId]);
        await pool.query('DELETE FROM Tasks WHERE task_id = ? AND status = "completed" AND user_id = ?', [id, userId]);
        res.json({ message: 'Task completed and deleted successfully' });
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get tasks by priority for notification
const getTasksByPriorityForNotification = async (req, res) => {
    try {
        const [highPriorityTasks] = await pool.query('SELECT * FROM Tasks WHERE priority = "high"');
        const [mediumPriorityTasks] = await pool.query('SELECT * FROM Tasks WHERE priority = "medium"');
        const [lowPriorityTasks] = await pool.query('SELECT * FROM Tasks WHERE priority = "low"');

        res.json({
            high: highPriorityTasks,
            medium: mediumPriorityTasks,
            low: lowPriorityTasks
        });
    } catch (error) {
        console.error('Error fetching tasks by priority:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};







module.exports = {
    getTasksByCategoryAndPriority,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksByPriorityForNotification,
    
};
