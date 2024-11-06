const budgetModel = require('./budgetModel')

exports.getAllBudgets = async (req, res) => {
    const { user_id } = req.params;
    try {
        const expenses = await budgetModel.getAllBudgets(user_id)
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expense data:', err);
        res.status(500).json({ error: 'Error fetching expense data' });
    }
};

exports.addBudget = async (req, res) => {
    const { user_id, current_amount, amount, category, date } = req.body;
    console.log(user_id, current_amount, amount, category, date)
    try {
        const newBudget = await budgetModel.addBudget(user_id, current_amount, amount, category, date)
        res.status(201).json(newBudget);
    } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ error: 'Error adding expense' });
    }
};

exports.updateBudget = async (req, res) => {
    const { id, user_id, current_amount, amount, category, date } = req.body;
    console.log(id, user_id, current_amount, amount, category, date)
    try {
        const updatedBudget = await budgetModel.updateBudget(user_id, id, current_amount, amount, category, date)
        if (updatedBudget) {
            res.json(updatedBudget)
        }
        else {
            res.status(404).json({ message: 'expense record not found or does not belong to user' });
        }
    } catch (err) {
        console.error('Error updating expense:', err);
        res.status(500).json({ error: 'Error updating expense' });
    }
};

exports.deleteBudget = async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const rowsDeleted = await budgetModel.deleteBudget(user_id, id)
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