import { Button, ButtonGroup } from '@mui/material'
import { useEffect, useState } from 'react';
import { socket } from '../Chat';
import './UserPanel.css'

export default function UserPanel() {
    const [isOnline, setIsOnline] = useState(true);
    const [isGroupe, setIsGroupe] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [groupe, setGroupe] = useState([]);
    const [userName, setUserName] = useState(window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1))

    useEffect(() => {
        socket.on('connect_new_user', arr => setOnlineUsers(arr))
        socket.on('disconnect_new_user', arr => setOnlineUsers(arr))

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
                                return <div className='user' key={i} >{el.userName}</div>
                            } else {
                                return ''
                            }
                        })}
                    </div> : ''
                }
                {isGroupe ? <div className='onlineUsers'>
                    {/* {groupe.map(el => <div className='groupe'>{el}</div>)} */}
                </div> : ''}

            </div>
        </div >

    )
}