import './App.css'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import { Route,Routes } from 'react-router-dom';
import ChatHome from './Pages/chat';
function App() {
  return(
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/SignUp" element = {<SignUp />} />
      <Route path = "/chatHome" element = {<ChatHome />} />
    </Routes>
  );

  
}

export default App
