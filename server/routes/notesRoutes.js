const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all notes by priority (descending order of created time)
router.get('/', authenticateToken, notesController.getAllNotesByPriority);

// Create a note
router.post('/', authenticateToken, notesController.createNote);

// Update a note
router.put('/:id', authenticateToken, notesController.updateNote);

// Delete a note
router.delete('/:id', authenticateToken, notesController.deleteNote);

module.exports = router;
