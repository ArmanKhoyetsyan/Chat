import { Button, ButtonGroup } from '@mui/material'
import { useEffect, useState } from 'react';
import { socket } from '../Chat';
import './UserPanel.css'

export default function UserPanel() {
    const [isOnline, setIsOnline] = useState(true);
    const [isGroupe, setIsGroupe] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [groupe, setGroupe] = useState([]);
    console.log("🚀 ~ file: UsersPanel.js ~ line 11 ~ UserPanel ~ groupe", groupe)
    const [userName, setUserName] = useState(window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1))

    useEffect(() => {
        socket.on('connect_new_user', arr => setOnlineUsers(arr))
        socket.on('disconnect_user', arr => setOnlineUsers(arr))
        socket.emit('get_groupe', { userName: userName })
        socket.on('get_groupe', arr => setGroupe(arr))
    }, []);

    return (
        <div className='userPanel'>
            <ButtonGroup
                variant="text"
            >
                <Button className='btn' onClick={() => {
                    setIsGroupe(false)
                    setIsOnline(true)

                }}>Online</Button>
                <Button className='btn' onClick={() => {
                    setIsOnline(false)
                    setIsGroupe(true)
                }}>Groupe</Button>
            </ButtonGroup>

            <div className=''>
                {isOnline ?
                    <div className='onlineUsers'>
                        {onlineUsers.map((el, i) => {
                            if (el.userName && el.userName !== userName) {
                                return <div
                                    className='user'
                                    key={i}
                                    onClick={() => {
                                        socket.emit('get_messages', { secondUser: el.userName, firstUser: userName })
                                    }}
                                >{el.userName}</div>
                            } else {
                                return ''
                            }
                        })}
                    </div> : ''
                }
                {isGroupe ? <div className='onlineUsers'>
                    {groupe.map((el, i) => {
                        return <div
                            key={i}
                            className='groupe'
                            onClick={() => {
                                socket.emit('get_messages', { secondUser: el.seconduser, firstUser: el.firstuser })
                            }}
                        >{`${el.firstuser}-${el.seconduser}`}</div>
                    }
                    )}
                </div> : ''}

            </div>
        </div >

    )
}