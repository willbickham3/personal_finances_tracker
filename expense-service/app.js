require('dotenv').config();
const express = require('express');
const expenseRoutes = require('./expenseRoutes'); // Import the expense routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the expense API routes at /api/expense
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});