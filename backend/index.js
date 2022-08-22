const express = require('express')
const cors = require('cors');
const { getUsers } = require('./db.request');

const app = express();
const port = process.env.PORT || 3030;
app.use(cors())

//app.get('/user', getUsers)

app.listen(port, () => console.log(`Port${port}`))
