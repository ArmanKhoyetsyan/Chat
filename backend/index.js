const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routers');
const server = http.createServer(app);
const port = process.env.PORT || 3030;
const io = new Server(server, {
    cors: {
        
    }
});

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/login', router)

io.on('connection', (socket) => {
    socket.on('send_message', (data) => {        
        socket.broadcast.emit("receive_message",data)
    })

});

server.listen(port, () => console.log(`Port${port}`))
