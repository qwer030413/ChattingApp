import { useEffect, useState } from 'react';
import './chatcomp.css'
import { motion } from 'framer-motion';
import * as io from 'socket.io-client'

var initialId = 0;
export default function ChattingComp(){
    let user = "Aditi"
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState([] as any)
    const [getMessage, setGetMessage] = useState("")
    const [room, setRoom] = useState("")
    const socket = io.connect("http://localhost:3001",{ transports : ['websocket'] })
   
    // useEffect(() => {
    //     const handleEnter = (event: { key: string; }) => {
    //        if (event.key === 'Enter') {
    //         console.log("Enter")
    //         {sendMessage()}
    //       }
    //     };
    //     window.addEventListener('keydown', handleEnter);
    
    //     return () => {
    //         window.removeEventListener('keydown', handleEnter);
    //     };
    //   }, []);
    useEffect(() => {
        // socket = io('http://localhost:3001')
        socket.on('connect', () => {
            console.log(`connected with id: ${socket.id}`)
        })
        
    }, []);
    // useEffect(() => {
    //     // socket = io('http://localhost:3001')
    //     socket.on('recieve-message', a => {
    //         setNewMessage([
    //             ...newMessage,
    //             {text: a, id: initialId}
    //         ])
    //     })
    // }, [socket]);
    socket.on('recieve-message', a => {
            setNewMessage([
                ...newMessage,
                {text: a, id: initialId}
            ])
            initialId = initialId + 1
        })

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
                    <h1 key = {i    }>{msg.text}</h1>
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