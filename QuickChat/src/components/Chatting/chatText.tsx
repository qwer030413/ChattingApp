import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {io} from 'socket.io-client'



export default function ChatTextBox(){
    const [message, setMessage] = useState("");
    // const socket = io('http://localhost:3001')

    useEffect(() => {
        const socket = io('http://localhost:3001')
        socket.once('connect', () => {
        console.log(`connected with id: ${socket.id}`)
        // socket.emit("custom-event", 18, "work")
    })
    }, []);
    function sendMessage(){
        const socket = io('http://localhost:3001')
        setMessage(message)
        console.log("clcik")
        if (message != ""){
            socket.emit('send-message', message)
        }
    }
    return(
        <>
        <div className="ChatBox">
            <input id = "ChatVal"type='text' className='ChattingBox'  placeholder='Message..' onChange={(e) => setMessage(e.target.value)}/>
            <motion.button className="SendBtn"
            onClick={() =>sendMessage()}
            >
            Send</motion.button>
        </div>
            
        </>
    );
}