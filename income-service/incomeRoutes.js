const express = require('express');
const router = express.Router();
const incomeController = require('./incomeController');

// Retrieve all the incomes for a user
router.get('/:user_id', incomeController.getAllIncome);
router.post('/', incomeController.addIncome)
router.put('/:id', incomeController.updateIncome)
router.delete('/:user_id/:id', incomeController.deleteIncome)

module.exports = router