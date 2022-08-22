const express = require('express')
const cors = require('cors')

const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const server = http.createServer(app);
const port = process.env.PORT || 3030;
const io = new Server(server, {
    cors: {}
});

app.use(cors())


app.get('/',(req,res)=>{
    res.send('hi')
})

app.listen(port, () => console.log(`Port${port}`))


