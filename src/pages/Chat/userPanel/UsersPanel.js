import { useEffect, useState } from 'react';
import { socket } from '../Chat';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import './UserPanel.css'

export default function UserPanel() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [groupe, setGroupe] = useState([]);
    const userName = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1)

    useEffect(() => {
        socket.emit('get_groupe', { userName: userName })
        socket.emit('send_userName', { userName: userName })
        socket.on('connect_new_user', arr => setOnlineUsers(arr))
        socket.on('disconnect_user', arr => setOnlineUsers(arr))
        socket.on('get_groupe', arr => setGroupe(arr))
        socket.on('update_groupe', () => socket.emit('get_groupe', { userName: userName }))

        // eslint-disable-next-line
    }, []);

    return (
        <div className='userPanel'>
            {/* <ButtonGroup
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
            </ButtonGroup> */}

            <div className=''>
                {/* {isOnline ?
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
                } */}
                {groupe ? <div className='onlineUsers'>
                    {groupe.map((el, i) => {
                        const userNames = `${el.firstuser === userName ?
                            `${el.firstuser}-${el.seconduser}` : `${el.seconduser} - ${el.firstuser}`}`;
                        const firstUser = userNames.slice(0, userNames.indexOf('-')).trim()
                        const secondUser = userNames.slice(userNames.lastIndexOf('-') + 1).trim()
                        return (
                            <div
                                key={i}
                                className='groupe'
                                onClick={() => {
                                    socket.emit('get_messages', { secondUser: secondUser, firstUser: firstUser })
                                }}
                            >
                                {userNames}
                                {onlineUsers.find(el => el.userName === secondUser) && <div className='online'></div>}
                                {el.lastMessage && el?.lastMessage?.sender === userName ?
                                    <div className='last_message'>
                                        {el?.lastMessage?.message}
                                        {el?.lastMessage?.read ? <DoneAllIcon sx={{ fontSize: "small" }} /> : <DoneIcon sx={{ fontSize: "small" }} />}
                                    </div>
                                    : <div
                                        style={el?.lastMessage?.read ? { fontWeight: 100 } : { fontWeight: 900 }}>
                                        {el?.lastMessage?.message}

                                    </div>
                                }
                            </div>)
                    }
                    )}
                </div> : ''}

            </div>
        </div >

    )
}
