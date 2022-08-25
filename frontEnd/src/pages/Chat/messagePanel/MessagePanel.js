import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { socket } from '../Chat'
import './MessagePanel.css'


export default function MessagePanel() {
    const [inputVal, setInputVal] = useState('')

    const [message, setMessage] = useState([]);
    const userName = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1)

    function sendMessage() {
        if (inputVal.length > 0) {
            socket.emit('send_message', { message: inputVal, userName: userName })
            socket.emit('send_userName', { userName: userName })
            setInputVal('')
        }
    }
    useEffect(() => {
        socket.emit('send_userName', { userName: userName })
    }, [])

    useEffect(() => {
        socket.on('send_message', (data) => {
            const newMessage = JSON.parse(JSON.stringify(message.push(data.message)))
            setMessage([newMessage])
        })
    }, [])

    return (
        <div className="messagePanel">
            <div className='messageField'>
                {message.map((el, i) => {
                    return (<h5 key={i}>{el}</h5>)
                })}
            </div>

            <div className='inputAndBtMessage' >
                <TextField
                    id="outlined-multiline-flexible"
                    label="Message"
                    multiline
                    value={inputVal}
                    maxRows={2}
                    sx={{ width: '222%' }}
                    onChange={(event) => {
                        setInputVal(event.target.value)
                    }}
                />
                <Button
                    sx={{ width: '30%' }}
                    variant="contained"
                    onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div >
    )
}