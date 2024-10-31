require('dotenv').config();
const express = require('express');
const budgetRoutes = require('./budgetRoutes'); // Import the expense routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the expense API routes at /api/expense
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});