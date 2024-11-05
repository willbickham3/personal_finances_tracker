require('dotenv').config();
const express = require('express');
const cors = require('cors')
const expenseRoutes = require('./expenseRoutes'); // Import the expense routes

const app = express();

app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json());

// Set up the expense API routes at /api/expense
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});