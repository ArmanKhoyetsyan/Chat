const express = require('express');
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

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {        
        socket.broadcast.emit("receive_message",data)
    })
    
});

server.listen(port, () => console.log(`Port${port}`))
