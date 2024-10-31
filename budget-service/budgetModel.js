const pool = require('./db')

// Setup CRUD Operations


// Add budget
const addBudget = async (user_id, current_amount, amount, category, date) => {
    const result = await pool.query('INSERT INTO budgets (user_id, current_amount, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, current_amount, amount, category, date]
    );
    return result.rows[0]
}

// Get all the budgets
const getAllBudgets = async (user_id) => {
    const result = await pool.query(
        'SELECT * FROM budgets WHERE user_id = $1',
        [user_id]
    );
    return result.rows;
};

// Update budget
const updateBudget = async (user_id, id, current_amount, amount, category, date) => {
    const result = await pool.query(
        'UPDATE budgets SET current_amount = $1, amount = $2, category = $3, date = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
        [current_amount, amount, category, date, id, user_id]);
    return result.rows[0];
}

// Delete budget
const deleteBudget = async (user_id, id) => {
    const result = await pool.query('DELETE FROM budgets WHERE user_id = $1 and id = $2', [user_id, id]);
    return result.rowCount;
}

module.exports = {
    addBudget,
    getAllBudgets,
    updateBudget,
    deleteBudget
}