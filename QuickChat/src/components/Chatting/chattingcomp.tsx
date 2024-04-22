import { useEffect, useState } from 'react';
import './chatcomp.css'
import { motion } from 'framer-motion';
import {io} from 'socket.io-client'

var initialId = 0;
export default function ChattingComp(){
    let user = "Aditi"
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState([] as any)
    var socket = io("")
    useEffect(() => {
        socket = io('http://localhost:3001')
        socket.once('connect', () => {
            console.log(`connected with id: ${socket.id}`)
        })
    }, []);
    
    socket.on('recieve-message', a => {
        setNewMessage([
            ...newMessage,
            {text: a, id: initialId}
        ])
    })

    function sendMessage(){
        // const socket = io('http://localhost:3001')
        setMessage(message)
        setNewMessage([
            ...newMessage,
            {text: message, id: initialId + 1}
        ])
        // socket.on('recieve-message', a => {
        //     setNewMessage([
        //         ...newMessage,
        //         {text: a, id: initialId}
        //     ])
        // })
        console.log("clcik")
        if (message != ""){
            socket.emit('send-message', message)
        }
        initialId = initialId + 1;
    }
    // const socket = io('http://localhost:3001')
    // socket.on('recieve-message', a => {
    //     setNewMessage([
    //         ...newMessage,
    //         {text: a}
    //     ])
    // })



    return(
         <div className="ChattingContent">
            <div className="Title">
                {user}
            </div>
            <div className='chatPlace'>
                {newMessage.map((msg:any) => (
                    <h1 key = {msg.id}>{msg.text}</h1>
                ))}
            </div>
            <div className="ChatBox">
                <input id = "ChatVal"type='text' className='ChattingBox'  placeholder='Message..' onChange={(e) => setMessage(e.target.value)}/>
                <motion.button className="SendBtn"
                onClick={() =>sendMessage()}
                >
                Send</motion.button>
            </div>
            
        </div>
    );
}