import './App.css'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp';
import { Route,Routes } from 'react-router-dom';
function App() {
  return(
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/SignUp  " element = {<SignUp />} />
    </Routes>
  );

  
}

export default App
