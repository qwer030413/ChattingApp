




import './animatedtab.css'
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { motion } from 'framer-motion';



export default function FriendBox(key:number, email:string, del:any){
    const spring = {
        type: "spring",
        damping: 17,
        stiffness: 900,
    }
    const hover = {
        scale: 1.05,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        // color:"#4000FD" 
        
    }
    const IconHover = {
        scale: 1.15,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        // color:"#4000FD" 
        
    }

    
    return(
        <>
        <motion.div className="FriendReqBoxContainer" key={key} 
        whileHover={hover} 
        // whileTap={{scale:1,}}
        transition={spring}>
            <text className='ReqEmail'>{email}</text>
            <div className='Icons'>
                <motion.div className='motionIcons'
                whileHover={IconHover} 
                whileTap={{scale:1,}}
                transition={spring}
                onClick={() =>del}
                >
                    <FaTimes className='Xsign'/>
                </motion.div>
                <motion.div className='motionIcons'
                whileHover={IconHover} 
                whileTap={{scale:1,}}
                transition={spring}>
                    <FaCheck className='checkMark'/>
                </motion.div>
                
                
            </div>  
            
        </motion.div>
        </>
    );
}