import './App.css'
import ColorBlob from './components/colorblob/colorblob'
import Anitext from './components/Headers/animatedText'

function App() {

  return (
    <>
    
    
    <ColorBlob />
    <div className='blur'></div>
    <div className='homeContent'>
      <Anitext text = "Welcome To Quick Chat" class = "header"/>
      {/* <h1 className='welcomeText'>Welcome to Quick Chat</h1> */}
    </div>
    
      
    </>
  )
}

export default App
