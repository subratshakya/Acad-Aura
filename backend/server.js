const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Print all environment variables
console.log('All Environment Variables:', process.env);

// Debug: Print specific environment variables (excluding sensitive ones)
console.log('Environment variables:', {
    MONGODB_URI: process.env.MONGODB_URI ? '***' : undefined, // Mask sensitive data
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET ? '***' : undefined // Mask sensitive data
});

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/acad-aura';
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// Connect to database
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Acad Aura API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('Shutting down gracefully...');
    await mongoose.connection.close();
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});