import { ReactElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import {motion, useAnimationControls } from "framer-motion";
import './animatedtab.css'
import SearchBox from '../SearchBox/SearchBox';
import FriendRequests from './friendRequest';



let totalHistorySec = 0;
let minitabs = [
    {
        label:"Add friends",
        id: 1
    },
    {
        label:"Friend Requests",
        id: 2
    },
    
];


    
export default function MiniTab(): ReactElement{
    const [tabs, setTabs] = useState(1);
    const left = useAnimationControls()
    let a = 1;
    function updateTabs(id: number)
    {
        setTabs(id);   
    }
   
    useEffect(() => {
        
            left.set({
                opacity:0,
                y: 50
            })
            left.start({ 
                
                opacity:1, 
                y: 0, 
                transition: { type: "spring", stiffness: 400, damping: 22  }
            })       
    }, [tabs])
    
    return(
        <div className={'minicontainer' + tabs}>
            
            <div className='minitab'>
                
                {minitabs.map((tab) =>(
                    <div
                    key={tab.id}
                    onClick={()=>updateTabs(tab.id)}
                    className={`hi${
                        tabs === tab.id? "":"minitabbtn"
                    } `}
                    >
                        
                        {tabs === tab.id && (
                            
                            <motion.div layoutId='index' className="indicator" transition={{duration:0.5, type: "spring", stiffness: 200, damping: 18}}/>
                        )}
                        <span className='highlight'>{tab.label}</span>
                        

                    </div>
                ))}
            </div>
            
            
            <div className='minicontent'>
            <motion.div className={tabs == 1? "showPomodoro" : "content"}>
                <h1>Add friends</h1>
                <SearchBox />
            </motion.div>
            <motion.div className={tabs == 2? "showShortBreak" : "content"}>
                <h1>Friend Requests</h1>
                <FriendRequests />
            </motion.div>
            </div>
            
            
           

        </div>
    );
}

export {totalHistorySec}