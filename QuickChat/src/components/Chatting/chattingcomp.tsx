import { useEffect, useState } from 'react';
import './chatcomp.css'
import { motion } from 'framer-motion';
import * as io from 'socket.io-client'

var initialId = 0;
export default function ChattingComp(){
    let user = "Aditi"
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState([] as any)
    const [room, setRoom] = useState("")
    const socket = io.connect("http://localhost:3001")
   
    
        
    socket.on('connect', () => {
            console.log(`connected with id: ${socket.id}`)
            console.log(socket)
        })

    
    function receiveMessage() {
        if (socket) {
            socket.on('recieve-message', a => {
                setNewMessage((prev: any) => [...prev, {
                    text: a, id: initialId
                }])
                initialId = initialId + 1
            })
        }
    }
    useEffect(() => {
        receiveMessage();
    }, [socket]);
    function sendMessage(){
        setNewMessage([
            ...newMessage,
            {text: message, id: initialId + 1}
        ])
        console.log(message)
        if (message != ""){
            socket.emit('send-message', message, room)
        }
        initialId = initialId + 1;
        console.log(newMessage)
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
                {newMessage.map((msg:any, i:any) => (
                    <h1 key = {i}>{msg.text}</h1>
                ))}
            </div>
            <div className="ChatBox">
                <input id = "ChatVal"type='text' className='ChattingBox' onChange={(e) => setMessage(e.target.value)} placeholder='Message..'/>
                <input id = "room"type='text' className='ChattingBox' onChange={(e) => setRoom(e.target.value)} placeholder='room..'/>
                <motion.button className="SendBtn"
                onClick={() =>sendMessage()}
                >
                Send</motion.button>
            </div>
            
        </div>
    );
}