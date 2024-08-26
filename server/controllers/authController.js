const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const nodemailer = require('nodemailer');


require('dotenv').config({ path: './server/.env' });

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.user_id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } // Access token expires in 1 hour
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.user_id }, 
        process.env.JWT_REFRESH_SECRET, 
        { expiresIn: '1y' } // Refresh token expires in 1 year
    );
};

const generateResetToken = (user) => {
    return jwt.sign(
        { userId: user.user_id },
        process.env.JWT_RESET_SECRET,
        { expiresIn: '1h' } // Reset token expires in 1 hour
    );
};


// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD, // Use the app password here
    },
});


const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the Users table is empty
        const [userCount] = await pool.query('SELECT COUNT(*) AS count FROM Users');
        let startId = 1; // Default starting ID

        if (userCount[0].count === 0) {
            // If Users table is empty, reset AUTO_INCREMENT to 1
            await pool.query('ALTER TABLE Users AUTO_INCREMENT = 1');
        } else {
            // If Users table is not empty, get the current AUTO_INCREMENT value
            const [autoIncrementResult] = await pool.query('SHOW TABLE STATUS LIKE "Users"');
            startId = autoIncrementResult[0].Auto_increment;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        const [result] = await pool.query('INSERT INTO Users (user_id, username, password, email) VALUES (?, ?, ?, ?)', [startId, username, hashedPassword, email]);

        // Generate tokens
        const user = { user_id: result.insertId, username, email };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
    } catch (error) {
        console.error('Error registering user:', error);
        
        // Handle duplicate entry errors
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.sqlMessage.includes('username')) {
                res.status(409).json({ message: 'Username already exists' });
            } else if (error.sqlMessage.includes('email')) {
                res.status(409).json({ message: 'Email already exists' });
            } else {
                res.status(409).json({ message: 'User already exists' });
            }
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};



// Login function in authController
const login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Adjusted to use BINARY for case-sensitive username comparison
        const query = username
            ? 'SELECT * FROM Users WHERE BINARY username = ?'
            : 'SELECT * FROM Users WHERE email = ?';
        const [users] = await pool.query(query, [username || email]);

        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const logout = async (req, res) => {
    try {
        // Invalidate the token by issuing a new one with a very short expiration time
        const emptyToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '1s' });

        // Optionally, clear client-side storage (cookies, local storage, etc.)
        // For example, in a browser context:
        res.clearCookie('accessToken'); // Clear cookie
        // Or, res.setHeader('Authorization', ''); // Clear Authorization header

        res.json({ message: 'Logout successful', token: emptyToken });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteUser = async (req, res) => {
    

    const userId = req.user[0].user_id;

    try {
        const [result] = await pool.query('DELETE FROM Users WHERE user_id = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const refreshToken = async (req, res) => {

    const { token: refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required' });

    // Verify if refresh token is in the list or database
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            // If token expired or any other error
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    });
};





const updateUser = async (req, res) => {
    const userId = req.user[0].user_id;
    const { username, password, email } = req.body;

    try {
        // Check if the username or email already exists
        const [existingUser] = await pool.query('SELECT * FROM Users WHERE (username = ? OR email = ?) AND user_id != ?', [username, email, userId]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash new password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Update user in the database
        const [result] = await pool.query(
            'UPDATE Users SET username = ?, password = ?, email = ? WHERE user_id = ?',
            [username, hashedPassword, email, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email exists in the database
      const [users] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
      const user = users[0];
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const resetToken = generateResetToken(user);
  
      // Email reset link to the user
      const resetLink = `${process.env.CLIENT_URL}/reset-pass/${user.user_id}/${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'JEE Planner Password Reset',
        html: `<p>You requested for a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending reset email' });
        }
        console.log('Reset email sent:', info.response);
        res.json({ message: 'Reset email sent successfully. Please check your email.' });
      });
  
    } catch (error) {
      console.error('Error in forgot password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Reset password
  const resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Verify the reset token
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
  
      if (decoded.userId !== parseInt(userId, 10)) {
        return res.status(400).json({ message: 'Invalid reset token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password in the database
      await pool.query('UPDATE Users SET password = ? WHERE user_id = ?', [hashedPassword, userId]);
  
      res.json({ message: 'Password reset successful. You can now log in with your new password.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
 

module.exports = {
    
    register,
    login,
    logout,
    deleteUser,
    updateUser,
    refreshToken,
    forgotPassword,
    resetPassword
};
