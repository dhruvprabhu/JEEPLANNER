const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Create and configure the MySQL connection pool using individual options
const pool = mysql.createPool({
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000, // Set timeout to 10 seconds
    timezone: 'Z', // This sets the timezone to UTC
    Promise: global.Promise // Set the default Promise library
});

module.exports = pool; // Export the pool directly
