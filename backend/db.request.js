const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '15975324862Ax',
    database: 'chat',
    port: '5432'
});

const getUsers = async (req, res) => {
    try {
        const response = await pool.query(`SELECT name FROM users`)
        res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
    }

}

module.exports = getUsers
