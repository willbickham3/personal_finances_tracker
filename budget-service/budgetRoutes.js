const express = require('express');
const router = express.Router();
const budgetController = require('./budgetController');

// Retrieve all the expenses for a user
router.get('/:user_id', budgetController.getAllBudgets);
router.post('/', budgetController.addBudget)
router.put('/:id', budgetController.updateBudget)
router.delete('/:user_id/:id', budgetController.deleteBudget)

module.exports = router