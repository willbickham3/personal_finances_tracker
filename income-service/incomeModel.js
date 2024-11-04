const pool = require('./db')
// const jwt = require('jsonwebtoken')

// CRUD Operations

// Returns all the incomes from the database
const getAllIncomeByUserId = async (user_id) => {
    console.log(`Fetching incomes for user_id: ${user_id}`);
    const result = await pool.query('SELECT * FROM income WHERE user_id = $1 ORDER BY date DESC', [user_id]);
    return result.rows;
}

// Adds an income to the database
const addIncome = async (user_id, amount, source, date) => {
    const result = await pool.query(
        'INSERT INTO income (user_id, amount, source, date) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, amount, source, date]
    );
    return result.rows[0];
};

// Updates an income in the database
const updateIncome = async (id, user_id, amount, source, date) => {
    console.log(id, user_id, amount, source, date)
    console.log('here')
    const result = await pool.query(
        'UPDATE income SET amount = $3, source = $4, date = $5 WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, user_id, amount, source, date]);
    console.log(result.rows[0])
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