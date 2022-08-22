import './App.css';
import io from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import LoginForma from './pages/loginForm/LoginForm';

export const socket = io.connect('http://localhost:3030');
//socket.emit('user_name', { name: "Arman" })


function App() {

  return (
      <Routes>
        <Route path='chat' element={<Chat />} />
        <Route path='*' element={<LoginForma />} />
      </Routes>

  );
}

export default App;
