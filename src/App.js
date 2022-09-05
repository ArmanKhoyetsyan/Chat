import './App.css';
import { Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import LoginForma from './pages/loginForm/LoginForm';



function App() {

  return (
      <Routes>
        <Route path='chat/:userName/*' element={<Chat />} />
        <Route path='*' element={<LoginForma />} />
      </Routes>

  );
}

export default App;
