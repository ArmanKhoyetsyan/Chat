import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import './messagePanel.css'


export default function MessagePanel() {
    const [inputVal, setInputVal] = useState('')

    const [message, setMessage] = useState(["asdads", "asdads", "asdads", "asdads", "asdads", "asdads", "asdads",]);

    function sendMessage() {

        setInputVal('')
    }

    return (
        <div className="messagePanel">
            <div className='messageField'>
                {/* {message.map((el) => {
                    return (<h5>{el}</h5>)
                })} */}
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