import PrimarySearchAppBar from "./appBar/AppBar";
import MessagePanel from "./messagePanel/MessagePanel";
import UserPanel from "./userPanel/UsersPanel";


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
