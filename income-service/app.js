require('dotenv').config();
const express = require('express');
const incomeRoutes = require('./incomeRoutes'); // Import the income routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the income API routes at /api/income
app.use('/api/income', incomeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});