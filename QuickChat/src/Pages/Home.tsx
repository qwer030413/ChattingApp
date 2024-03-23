import ColorBlob from "../components/colorblob/colorblob";
import Anitext from "../components/Headers/animatedText";
import LoginComp from "../components/login/Login";
import { useEffect, useState } from 'react';
import LoginButton from "../components/buttons/LoginButton";



export default function Home(){
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
            <div>
            <Anitext text = "Welcome " class = "header"/>
            <Anitext text = "To " class = "header"/>
            <Anitext text = "Quick " class = "header"/>
            <Anitext text = "Chat" class = "header"/>
            </div>
            {LoginButton("Get Started", "getstarted", "/SignUp")}
            
            
        </div>
        
        <LoginComp />
        </div>
       
        
        </>
    );
}