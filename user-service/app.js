require('dotenv').config();
const express = require('express');
const userRoutes = require('./userRoutes'); // Import user routes

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Register the user routes under /api/users
app.use('/api/users', userRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});