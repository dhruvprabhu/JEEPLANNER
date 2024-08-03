// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        const [user] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [decoded.userId]);
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        req.user = user; // Assign user object to req.user
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken
};
