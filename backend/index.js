const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const router = require('./routers');
const { route } = require('./routers');
const { getUserId, getGroupeId, getMessages, writeMessages, getGroups, createGroupe, getUserName } = require('./db.request');
const server = http.createServer(app);
const port = process.env.PORT || 3030;
const io = new Server(server, {
    cors: {
        origin: "http://192.168.31.183:3000",
        methods: ["GET", "POST", "PUT"]
    }
});

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));

const connection = []

app.post('/login', router)
app.get('getMessages', router)

io.on('connection', (socket) => {
    connection.push({ id: socket.id })


    socket.on('get_groupe', async (data) => {
        const userId = await getUserId(data.userName)
        const groupers = await getGroups(userId)
        for (let elem of groupers) {
            elem.firstuser = await getUserName(elem.firstuser)
            elem.seconduser = await getUserName(elem.seconduser)
        }
        io.emit('get_groupe', groupers)
    })

    socket.on('get_messages', async (data) => {
        const secondUserId = await getUserId(data.secondUser)
        const firstUserId = await getUserId(data.firstUser)
        const groupId = await getGroupeId(firstUserId, secondUserId)
        // if (groupId) {
        const messages = await getMessages(groupId)
        io.emit('get_messages', {
            groupId:groupId,
            messages: messages,
            firstUser:data.firstUser            
        })
        // } else {
        //     await createGroupe(secondUserId, firstUserId)
        //     const groupId = await getGroupeId(firstUserId, secondUserId)
        //     await writeMessages("Hi", groupId, secondUserId)
        //     const messages = await getMessages(groupId)
        //     io.emit('get_messages', {
        //         messages: messages,
        //         secondUserId: secondUserId,
        //         secondUserName: data.secondUser,
        //         firstUserId: firstUserId,
        //         firstUserName: data.firstUser
        //     })
        // }
    })

    socket.on('send_message', async (data) => {
        const senderId = await getUserId(data.sender)
        await writeMessages(data.message, data.groupId, senderId)
        const messages = await getMessages(data.groupId)
        io.emit('send_message', messages)
    })

    socket.on('send_userName', (data) => {
        let i;
        const user = connection.find((el, index) => {
            i = index
            return el.id === socket.id
        })
        connection[i].userName = data.userName
        io.emit('connect_new_user', connection)
    })

    socket.on('disconnect', () => {
        let i;
        const user = connection.find((el, index) => {
            i = index
            return el.id === socket.id
        })
        connection.splice(i, 1)
        io.emit('disconnect_user', connection)

    })

});

server.listen(port, () => console.log(`Port${port}`))
