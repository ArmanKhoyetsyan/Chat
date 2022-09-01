import { Button, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { socket } from '../Chat'
import './MessagePanel.css'


export default function MessagePanel() {
    const [inputVal, setInputVal] = useState('');
    const [message, setMessage] = useState([]);
    const [groupId, setGroupId] = useState();
    const firstUserName = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1);
    function sendMessage() {
        if (inputVal.length > 0) {
            socket.emit('send_userName', { userName: firstUserName })
            socket.emit('send_message', { message: inputVal, sender: firstUserName, groupId: groupId })
            setInputVal('')
        }
    }

    function updateScroll() {
        var element = document.getElementById('messageField');
        element.scrollTop = element?.scrollHeight;
    }

    function useEffectArman(func, arrVal) {
        const render = useRef(0)
        useEffect(() => {
            if (render.current > 1) {
                func()
            } else {
                render.current++
            }
        }, [arrVal]);
    }

    useEffectArman(() => {
        updateScroll()
    }, [message])

    useEffect(() => {
        socket.on('send_message', (data) => {
            const user = data?.connection.find(el => {
                return el.id === socket.id
            })
            if (user?.getMessage) {
                setMessage(data?.messages)
            }
        })
        socket.on('get_messages', (data) => {
            setGroupId(data?.groupId)
            const user = data?.connection.find(el => {
                return el.id === socket.id
            })
            if (user?.getMessage) {
                setMessage(data?.messages)
            }
        })
    }, [])

    return (
        (message.length > 0 ?
            < div className="messagePanel" >
                <div className='messageField' id='messageField'>
                    {message.map((el, i, arr) => {
                        if (el?.senderid === 3) {
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