import { useEffect, useState } from 'react';
import './chatcomp.css'
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import Axios from 'axios'
import { curUser } from '../login/Login';
import { curChatId } from '../Contacts/Contacts';
var curChat = ""
var initialId = 0;
// const socket = io.connect("http://localhost:3001")
export default function ChattingComp(currentChat:string){
    const [message, setMessage] = useState("");
    const [newMessage, setNewMessage] = useState([] as any)
    const [room, setRoom] = useState("")
    const socket = io("http://localhost:3001", {autoConnect: false})
    const[curChatUser, setCurChat] = useState("")
    useEffect(() => {
        setCurChat(curChat)
    },[changeCurChat])
    useEffect(() => {
        socket.connect()
        
        return () => {
            console.log("disconnected")
            socket.disconnect();
        };
    },[])
    useEffect(() => {
        socket.on('connect', () => { 
            console.log(socket.id)
            Axios.post("http://localhost:3000/socketid", {
                id: socket.id,
                email:curUser
            }).then(res => {
                // console.log(`connected with id: ${socket.id}`)
            })
        })

    },[])  
    
    
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
            // socket.emit('send-message', message, room)
            console.log(curChatId)
            socket.emit('send-message', message, curChatId)
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
                {currentChat}
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

export function changeCurChat(email:string)
{
    curChat = email
    console.log(email)
}
export {curChat}