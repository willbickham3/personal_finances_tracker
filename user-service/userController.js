const bcrypt = require('bcrypt')
const pool = require('./db')

const saltRounds = 10;

exports.createUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const hash = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
            'INSERT INTO users (password, email) VALUES ($1, $2) RETURNING *',
            [hash, email]
        );
        res.status(201).json({ id: result.rows[0].id, email });
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
}

exports.userLogin = async (req, res) => {
    return
}