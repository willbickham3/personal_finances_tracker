const pool = require('./db')

// CRUD Operations

// Returns all the incomes from the database
const getAllIncomeByUserId = async (user_id) => {
    const result = await pool.query('SELECT * FROM income WHERE user_id = $1', [user_id]);
    return result.rows;
}

// Adds an income to the database
const addIncome = async (user_id, amount, source, date) => {
    const result = await pool.query('INSERT INTO income (user_id, amount, source, date VALUES ($1, $2, $3, $4) RETURNING *',
                                   [user_id, amount, source, date]);
    return result.rows[0]
}

// Updates an income in the database
const updateIncome = async (user_id, id, amount, source, date) => {
    const result = await pool.query(
        'UPDATE income SET amount = $1, source = $2, date = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [amount, source, date, id, user_id]);
    return result.rows[0];
}

// Deletes an income from the database
const deleteIncome = async (user_id, id) => {
    const result = await pool.query('DELETE FROM income WHERE user_id = $1 and id = $2', [user_id, id]);
    return result.rowCount;
}

module.exports = {
    getAllIncomeByUserId,
    addIncome,
    updateIncome,
    deleteIncome
}