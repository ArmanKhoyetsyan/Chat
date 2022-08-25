const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '15975324862Ax',
    database: 'chat',
    port: '5432'
});

const getUsers = async () => {
    try {
        const response = await pool.query(`SELECT * FROM users`)
        return response.rows
    } catch (error) {
        console.log(error)
    }
}

const getMessages = async () =>{}


    module.exports = { getUsers }
