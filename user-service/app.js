require('dotenv').config();
const express = require('express');
const cors = require('cors')

const userRoutes = require('./userRoutes'); // Import user routes

const app = express();

app.use(cors())

app.use(express.json()); // Middleware to parse JSON

// Register the user routes under /api/users
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`User service running on port ${PORT}`);
});