
import './popup.css'
import { motion } from 'framer-motion';
import pic from '../AccountNavBar/DefaultPFP.jpg'
import { IoClose } from "react-icons/io5";

function ChatProfilePop(show:boolean, setShow:any, pfp:string, curChat:string, curUserName: string, Bio:string) {
  return (show)? (
    <motion.div 
    className="ChatProfilePop"
    initial = {{scale:0}}
    animate = {{scale:1}}
    transition={{ type: "spring", stiffness: 700, damping: 47, duration:2}}
    exit={{scale:0}}
    drag
    dragConstraints={{ top: 0, bottom: 0, left:0, right: 0}}
    >
        <div className='popupTop'>
            <IoClose onClick={() =>setShow(false)} className='closeButton'/>
        </div>
        <img src = {pfp === null ? pic : 'http://localhost:3000/' + pfp} className="popupPFP"/>
        <text className='UserNamep'>{curUserName}</text>
        <div className='popupInfo'>
            <div className='ppSection'>
                <div className='ppTitle'>
                    <div className='ppline'></div>
                    <text className='pptitle'>Email</text>
                </div>
                <text className='AccInfoPOP'>{curChat}</text>
            </div>
            <div className='ppSection'>
                <div className='ppTitle'>
                    <div className='ppline'></div>
                    <text className='pptitle'>About Me</text>
                </div>
                <text className='AccInfoPOP'>{Bio}</text>
            </div>
        </div>

    </motion.div>
    ):"";
    
  
}

export default ChatProfilePop