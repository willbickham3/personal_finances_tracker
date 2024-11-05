const express = require('express');
const router = express.Router();
const expenseController = require('./expenseController');

// Retrieve all the expenses for a user
router.get('/:user_id', expenseController.getAllExpenses);
router.post('/', expenseController.addExpense)
router.put('/', expenseController.updateExpense)
router.delete('/:user_id/:id', expenseController.deleteExpense)

module.exports = router