const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');



// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Logout user
router.post('/logout', authenticateToken, authController.logout);

// Delete user
router.delete('/delete', authenticateToken, authController.deleteUser);

// Update user credentials
router.put('/update-user', authenticateToken, authController.updateUser);

// Route for refreshing access token
router.post('/refresh', authController.refreshToken);


// Route for forgot password
router.post('/forgot-password', authController.forgotPassword);

// Route for reset password
router.post('/reset-pass/:userId/:token', authController.resetPassword);



module.exports = router;
