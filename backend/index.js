const express = require('express');
const connectDB = require('./connectDB');

const app = express();

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js application connected to MongoDB!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});