require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;

//    ssl: { rejectUnauthorized: false }