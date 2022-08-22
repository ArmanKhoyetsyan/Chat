import { Button, ButtonGroup } from '@mui/material'
import './UserPanel.css'

export default function UserPanel() {

    return (
        <div className='userPanel'>
            <ButtonGroup
                variant="text"
            >
                <Button className='btn'>Online</Button>
                <Button className='btn'>Groupe</Button>
            </ButtonGroup>

            <div className=''>

            </div>
        </div >

    )
}