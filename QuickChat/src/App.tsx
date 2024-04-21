import './App.css'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import { Route,Routes } from 'react-router-dom';
import ChatHome from './Pages/chat';
import { Toaster } from 'react-hot-toast';
import ChatPage from './Pages/chatPage';
function App() {
  return(
    <>
    <div><Toaster/></div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/SignUp" element = {<SignUp />} />
        <Route path = "/chatHome" element = {<ChatHome />} />
        <Route path = "/chatHome/chatPage" element = {<ChatPage />} />
      </Routes>
    </>
    
  );

  
}

export default App
