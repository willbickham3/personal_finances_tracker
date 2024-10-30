const incomeModel = require('./incomeModel')

exports.getAllIncome = async (req, res) => {
    const { userId } = req.params;
    try {
        const incomes = await incomeModel.getAllIncomeByUserId(userId)
        res.json(incomes);
    } catch (err) {
        console.error('Error fetching income data:', err);
        res.status(500).json({ error: 'Error fetching income data' });
    }
};

exports.addIncome = async (req, res) => {
    const { user_id, amount, source, date } = req.body;
    try {
        const newIncome = await incomeModel.addIncome(user_id, amount, source, date)
        res.status(201).json(newIncome);
    } catch (err) {
        console.error('Error adding income:', err);
        res.status(500).json({ error: 'Error adding income' });
    }
};

exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { user_id, amount, source, date } = req.body;
    try {
        const updatedIncome = await incomeModel.updateIncome(user_id, id, amount, source, date)
        if (updatedIncome) {
            res.json(updatedIncome)
        }
        else {
            res.status(404).json({ message: 'Income record not found or does not belong to user' });
        }
    } catch (err) {
        console.error('Error updating income:', err);
        res.status(500).json({ error: 'Error updating income' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { user_id, id } = req.params;
    try {
        const rowsDeleted = await incomeModel.deleteIncome(user_id, id)
        if (rowsDeleted === 0) {
            res.status(404).json({ message: 'Income record not found or does not belong to user' });
        } else {
            res.status(204).send(); // No Content, indicating successful deletion
        }
    } catch (err) {
        console.error('Error deleting income:', err);
        res.status(500).json({ error: 'Error deleting income' });
    }
};
