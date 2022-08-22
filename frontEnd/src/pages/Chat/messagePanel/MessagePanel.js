import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { socket } from '../../../App';
import './MessagePanel.css'


export default function MessagePanel() {
    const [inputVal, setInputVal] = useState('')

    const [message, setMessage] = useState([]);
    
    function sendMessage() {
        socket.emit('send_message', { message: inputVal })
        const a = JSON.parse(JSON.stringify(message))
        a.push(inputVal)
        setMessage(a)
        setInputVal('')
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("🚀 ~ file: messagePanel.js ~ line 22 ~ socket.on ~ data.message", data.message)
            //setMessage([...data.message])

        })
    }, [socket])

    return (
        <div className="messagePanel">
            <div className='messageField'>
                {message.map((el) => {
                    return (<h5 key={el}>{el}</h5>)
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