const pool = require('./db')

// CRUD Operations

// Returns all the expenses from the database
const getAllExpensesByUserId = async (user_id) => {
    console.log(`Fetching expenses for user_id: ${user_id}`);
    const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC', [user_id]);
    return result.rows;
};


// Adds an expense to the database
const addExpense = async (user_id, amount, category, date) => {
    console.log('we here')
    console.log(user_id, amount, category, date)
    const result = await pool.query(
        'INSERT INTO expenses (user_id, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, amount, category, date]
    );
    return result.rows[0];
}

// Updates an expense in the database
const updateExpense = async (id, user_id, amount, category, date) => {
    const result = await pool.query(
        'UPDATE expenses SET amount = $1, category = $2, date = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [amount, category, date, id, user_id]);
    return result.rows[0];
}

// Deletes an expense from the database
const deleteExpense = async (user_id, id) => {
    const result = await pool.query('DELETE FROM expenses WHERE user_id = $1 and id = $2', [user_id, id]);
    return result.rowCount;
}

module.exports = {
    getAllExpensesByUserId,
    addExpense,
    updateExpense,
    deleteExpense
}