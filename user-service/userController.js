const bcrypt = require('bcrypt')
const pool = require('./db')
const jwt = require('jsonwebtoken')

const key = process.env.SECRET

const saltRounds = 10;

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
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
    const { email, password: loginPassword } = req.body;
    try {
        const result = await pool.query('SELECT user_id, password FROM users WHERE email = $1', [email]);

        const user_id = result.rows[0].user_id;
        const hashedPassword = result.rows[0].password;
        console.log('ID: ', user_id)
        console.log('hashedPassword: ', hashedPassword)

        const isMatch = await bcrypt.compare(loginPassword, hashedPassword);
        if (isMatch) {
            // generate token
            const token = jwt.sign({ user_id }, key, { expiresIn: '1d'})
            res.json({ message: 'Login Successful', token });
        }
        else {
            return res.status(401).json({ error: 'Incorrect email or password' });
            // err (user doesnt exist or password is correct)
        }
    }
    catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).json({ error: 'An error occured during login' });
    }
}