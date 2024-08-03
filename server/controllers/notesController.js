const pool = require('../config/database');
const moment = require('moment-timezone');

const getAllNotesByPriority = async (req, res) => {
    try {
        const userId=req.user[0].user_id;
        const [notes] = await pool.query(
            'SELECT *, DATE_FORMAT(created_at, "%d/%m") as formatted_date FROM Notes WHERE user_id = ? ORDER BY created_at ASC',
            [userId]
        );
        const formattedNotes = notes.map(note => ({
            ...note,
            date: note.formatted_date,
            content: note.content.split('\n') // Transform content into an array
        }));
        res.json(formattedNotes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Example backend controller (Node.js/Express)
const createNote = async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log the request body for debugging
  
      const { title, content } = req.body;
      const userId = req.user[0].user_id;
  
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Notes');
      const count = rows[0].count;
  
      if (count === 0) {
        await pool.query('ALTER TABLE Notes AUTO_INCREMENT = 1');
      }
  
      const createdAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
      const note_id = await pool.query(
        'INSERT INTO Notes (title, content, user_id, created_at) VALUES (?, ?, ?, ?)',
        [title, content, userId, createdAt]
      );
  
      const newNote = {
        note_id,
        title,
        content,
        user_id: userId,
        created_at: createdAt,
      };
  
      res.status(201).json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  


// Update a note
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId=req.user[0].user_id;

        // Convert content array to a string with each item on a new line
        const formattedContent = Array.isArray(content) ? content.join('\n') : content;

        const [result] = await pool.query(
            'UPDATE Notes SET title = ?, content = ? WHERE note_id = ? AND user_id = ?',
            [title, formattedContent, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId=req.user[0].user_id;

        const [result] = await pool.query('DELETE FROM Notes WHERE note_id = ? AND user_id = ?', [id, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllNotesByPriority,
    createNote,
    updateNote,
    deleteNote,
};
