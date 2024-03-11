import { motion } from 'framer-motion';
import './App.css'
import ColorBlob from './components/colorblob/colorblob'
import Anitext from './components/Headers/animatedText'
import LoginComp from './components/login/Login'
import { BsChatLeftDotsFill } from "react-icons/bs";
import { useEffect, useState } from 'react';


function App() {
// window.location.reload(); 
  const[_track, setTrack] = useState(false);
  
  useEffect(() => {
    setTrack(true)
  }, [onpointermove])
  return (
    <>
    
    
    <ColorBlob />
    <div className='blur'></div>
    <div className='homeContent'>
      <div className='Welcome'>
        <Anitext text = "Welcome To Quick Chat" class = "header"/>
        <div className='chatIconBox'>
          <motion.div 
          initial={{ opacity: 1}}
          transition={{ type: "spring", stiffness: 500}}
          whileHover={{ rotate: 30, opacity: 1}}
          whileTap={{ scale: 1.2 }}
          className='chatIcons'>
          <BsChatLeftDotsFill />

          
         </motion.div>
        </div>
        
         
      </div>
     
      <LoginComp />
    </div>
    
      
    </>
  )
}

export default App
