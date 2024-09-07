

import Axios from 'axios'
import './animatedtab.css'
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { curUser } from '../login/Login';
export default function FriendRequests(){
    const [requests, setRequests] = useState([] as any)
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
    useEffect(() => {
        Axios.post("http://localhost:3000/users/getFriendReq", {
            email: curUser,
        }).then(res => {
            for(let i = 0; i < res.data.length; i++)
            {
                setRequests((a: any) => [...a,
                {email: res.data[i].fromEmail}
                ]);
            }
        }).catch(err => {
            console.log(err)
        
        });
    }, [])
    function handleRemoveItem(email:string) {
        console.log(email)
        setRequests(requests.filter((item: { email: string; }) => item.email !== email))
        Axios.post("http://localhost:3000/users/deleteRequest", {
                
            recieveEmail: curUser,
            fromEmail: email

        });
    }
    function AcceptFriend(email:string) {
        console.log(email)
        setRequests(requests.filter((item: { email: string; }) => item.email !== email))
        Axios.post("http://localhost:3000/users/AddFriend", {
                
            myEmail: curUser,
            Email: email

        });
        Axios.post("http://localhost:3000/users/deleteRequest", {
                
            recieveEmail: curUser,
            fromEmail: email

        });
    }
    return(
        <>
        <div className='FriendReqContainer'>
            {(requests)? (<text style={{fontSize:30, marginTop:70}}>Nothing Here!</text>):(requests.map((cont:any, i:any) => (
                <>
                    <motion.div className="FriendReqBoxContainer" key={i} 
                    whileHover={hover} 
                    // whileTap={{scale:1,}}
                    transition={spring}>
                        <text className='ReqEmail'>{cont.email}</text>
                        <div className='Icons'>
                            <motion.div className='motionIcons'
                            whileHover={IconHover} 
                            whileTap={{scale:1,}}
                            transition={spring}
                            onClick={() =>handleRemoveItem(cont.email)}
                            >
                                <FaTimes className='Xsign'/>
                            </motion.div>
                            <motion.div className='motionIcons'
                            whileHover={IconHover} 
                            whileTap={{scale:1,}}
                            transition={spring}
                            onClick={() =>AcceptFriend(cont.email)}
                            >
                                <FaCheck className='checkMark'/>
                            </motion.div>
                        </div>  
                    </motion.div>
                </>
            )))}
            {/* {requests.map((cont:any, i:any) => (
                <>
                    <motion.div className="FriendReqBoxContainer" key={i} 
                    whileHover={hover} 
                    // whileTap={{scale:1,}}
                    transition={spring}>
                        <text className='ReqEmail'>{cont.email}</text>
                        <div className='Icons'>
                            <motion.div className='motionIcons'
                            whileHover={IconHover} 
                            whileTap={{scale:1,}}
                            transition={spring}
                            onClick={() =>handleRemoveItem(cont.email)}
                            >
                                <FaTimes className='Xsign'/>
                            </motion.div>
                            <motion.div className='motionIcons'
                            whileHover={IconHover} 
                            whileTap={{scale:1,}}
                            transition={spring}
                            onClick={() =>AcceptFriend(cont.email)}
                            >
                                <FaCheck className='checkMark'/>
                            </motion.div>
                        </div>  
                    </motion.div>
                </>
            ))} */}
        </div>
        </>
    );
}

