require('dotenv').config();
const express = require('express');
const cors = require('cors')
const budgetRoutes = require('./budgetRoutes'); // Import the expense routes

const app = express();

app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the expense API routes at /api/expense
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});