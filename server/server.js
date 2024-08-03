const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { routeNotFound, errorHandler } = require('./middleware/errorMiddleware');
const taskRoutes = require('./routes/taskRoutes');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const pool = require('./config/database');

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());
app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to my JEE Planner App');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Middleware to authenticate other routes
app.use('/api/tasks', taskRoutes); // Apply auth middleware to task routes
app.use('/api/notes', notesRoutes); // Apply auth middleware to notes routes

// Route not found middleware
app.use(routeNotFound);

// Error handling middleware
app.use(errorHandler);

// Database connection check
const connectDatabase = async () => {
    try {
        await pool.getConnection();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

connectDatabase();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
