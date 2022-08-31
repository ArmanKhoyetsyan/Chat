import PrimarySearchAppBar from "./appBar/AppBar";
import MessagePanel from "./messagePanel/MessagePanel";
import UserPanel from "./userPanel/UsersPanel";
import io from 'socket.io-client';


export const socket = io.connect('http://192.168.31.183:3030');
export default function Chat() {

    return (

        <div className="App">
            <PrimarySearchAppBar />

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px' }}>
                <UserPanel />
                <MessagePanel />
            </div>

        </div>
    );
}
