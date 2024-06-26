import './nav.css'
import { IoHomeSharp } from "react-icons/io5";
import { color, motion } from 'framer-motion';
import { IoChatboxEllipses } from "react-icons/io5";
import { useNavigate} from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";


export default function ChatNavBar(){
    const navigate = useNavigate(); 

    const spring = {
        type: "spring",
        damping: 42,
        stiffness: 700,
    }
    const hover = {
        scale: 1.15,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        // color:"#4000FD" 
        
    }
    let tabs = [
    {
        label:<IoHomeSharp/>,
        id: 1,
        address: "/chatHome"
    },
    {
        label:<IoChatboxEllipses/>,
        id: 2,
        address: "/chatHome/chatPage"
    },
    {
        label:<MdAccountCircle/>,
        id: 3,
        address: "/Account"
    },
    
];
    return(
        <>
        <div className='navbar'>
        {tabs.map((tab:any) => (
                    
                        <motion.div key = {tab.id} className='HomeIcon'whileHover={hover} onClick={() => navigate(tab.address)}
                        whileTap={{
                            scale:1,
                        }}
                        transition={spring}>
                            {tab.label}
                            
                        </motion.div>
                ))} 
            
        </div>
      
        </>
        
    );
}