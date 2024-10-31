const expenseModel = require('./expenseModel')

exports.getAllExpenses = async (req, res) => {
    const { user_id } = req.params;
    try {
        const expenses = await expenseModel.getAllExpensesByUserId(user_id)
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expense data:', err);
        res.status(500).json({ error: 'Error fetching expense data' });
    }
};

exports.addExpense = async (req, res) => {
    const { user_id, amount, category, date } = req.body;
    try {
        const newexpense = await expenseModel.addExpense(user_id, amount, category, date)
        res.status(201).json(newexpense);
    } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Error adding expense' });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { user_id, amount, category, date } = req.body;
    try {
        const updatedexpense = await expenseModel.updateExpense(user_id, id, amount, category, date)
        if (updatedexpense) {
            res.json(updatedexpense)
        }
        else {
            res.status(404).json({ message: 'expense record not found or does not belong to user' });
        }
    } catch (err) {
        console.error('Error updating expense:', err);
        res.status(500).json({ error: 'Error updating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const rowsDeleted = await expenseModel.deleteExpense(user_id, id)
        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'expense record not found or does not belong to user' });
        } else {
            res.status(204).send(); // No Content, indicating successful deletion
        }
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({ error: 'Error deleting expense' });
    }
};
