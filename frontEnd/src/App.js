import './App.css';
import PrimarySearchAppBar from './appBar/AppBar';
import MessagePanel from './messagePanel/messagePanel';
import UserPanel from './userPanel/usersPanel';

function App() {


  return (
    <div className="App">
      <PrimarySearchAppBar />

      <div style={{ display: 'flex', flexDirection: 'row', marginTop:'8px'}}>
        <UserPanel />
        <MessagePanel />
      </div>

    </div>
  );
}

export default App;
