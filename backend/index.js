const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routers');
const { route } = require('./routers');
const server = http.createServer(app);
const port = process.env.PORT || 3030;
const io = new Server(server, {
    cors: {

    }
});

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));

const connection = []

app.post('/login', router)

io.on('connection', (socket) => {
    connection.push({ id: socket.id })
    
    socket.on('send_message', (data) => {
        io.emit('send_message', data)
    })
    
    socket.on('send_userName', (data) => {
        let i;
        const user = connection.find((el, index) => {
            i = index
            return el.id === socket.id
        })
        connection[i].userName = data.userName
        io.emit('connect_new_user',connection)
    })

    socket.on('disconnect', () => {
        let i;
        const user = connection.find((el, index) => {
            i = index
            return el.id === socket.id
        })
        connection.splice(i, 1)
        io.emit('disconnect_new_user',connection)
        
    })

});

server.listen(port, () => console.log(`Port${port}`))
