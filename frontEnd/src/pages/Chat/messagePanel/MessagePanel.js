import { Button, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { socket } from '../Chat'
import './MessagePanel.css'


export default function MessagePanel() {
    const [inputVal, setInputVal] = useState('')
    const [message, setMessage] = useState([]);
    const [firstUserName, setFirstUserName] = useState(window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1))
    const [secondUserName, setSecondUserName] = useState()

    function useEffectArman(func, arrVal) {
        const render = useRef(0)
        useEffect(() => {
            if (render.current) {
                func()
            } else {
                render.current++
            }
        }, [arrVal]);
    }
    function sendMessage() {
        if (inputVal.length > 0) {
            socket.emit('send_message', { message: inputVal, firstUserName: firstUserName, secondUserName: secondUserName })
            socket.emit('send_userName', { userName: firstUserName })
            setInputVal('')
        }
    }
    function updateScroll() {
        var element = document.getElementById('messageField');
        element.scrollTop = element?.scrollHeight;
    }

    useEffectArman(() => {
        updateScroll()
    }, [message])

    useEffect(() => {
        socket.on('send_message', (data) => {
            setMessage(data)
        })
        socket.on('get_messages', (data) => {
            setMessage(data?.messages)
            setFirstUserName(data?.firstUserName)
            setSecondUserName(data?.secondUserName)
        })
        socket.emit('send_userName', { userName: firstUserName })
    }, [])

    return (
        (message.length > 0 ?
            < div className="messagePanel" >
                <div className='messageField' id='messageField'>
                    {message.map((el, i, arr) => {
                        if (el?.senderid === arr[0]?.senderid) {
                            return (<h4 key={i} className='user1'>{el.message}</h4>)
                        } else {
                            return (<h4 key={i} className='user2'>{el.message}</h4>)
                        }
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
            : ""
        )
    )
}