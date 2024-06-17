import { useEffect, useState, useRef, useCallback } from 'react';
import './chatcomp.css'
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import Axios from 'axios'
import { curUser } from '../login/Login';
import { curChatId } from '../Contacts/Contacts';
var curChat = ""
var initialId = 0;
// const socket = io.connect("http://localhost:3001")
export default function ChattingComp(currentChat:string, newMessage: any, setNewMessage:any){
    // const socket = io("http://localhost:3001")
    var socket = io('http://localhost:3001', { transports : ['websocket'] });
    const bottomScroll = useRef<HTMLDivElement>(null)
    const[curChatUser, setCurChat] = useState("")
    useEffect(() => {
        setCurChat(curChat)
    },[changeCurChat])
    useEffect(() => {
        console.log(newMessage)
        socket.connect()
        socket.on('connect', () => { 
            Axios.post("http://localhost:3000/socketid", {
                id: socket.id,
                email:curUser
            }).then(res => {
                // console.log(`connected with id: ${socket.id}`)
            })
        })
        return () => {
            console.log("disconnected")
            socket.disconnect();
        };
    },[])

    //handling enter key
    const checkKeyPress = useCallback((e) => {
        const { key, keyCode } = e;
        if (keyCode === 13) {
        sendMessage()
        }
    },[newMessage]);

    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress);
        return () => {
        window.removeEventListener("keydown", checkKeyPress);
        };
    }, [checkKeyPress]);
 
    

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
        console.log(newMessage)
        var msg = (document.getElementById("ChatVal") as HTMLInputElement).value
        setNewMessage([
            ...newMessage,
            {text: msg, id: initialId + 1}
        ])
        Axios.post("http://localhost:3000/StoreChats", {
            fromEmail:curUser,
            toEmail: currentChat, 
            text: msg
        }).then(res => {
        })
        if (msg != ""){
            console.log(curChatId)
            socket.emit('send-message', msg, curChatId)
        }
        initialId = initialId + 1;
    }


    useEffect(() => {
        if(bottomScroll.current){
            bottomScroll.current.scrollIntoView();
        }
    }, [sendMessage])
    return(
         <div className="ChattingContent">
            <div className="Title">
                {currentChat}
            </div>
            <div className='chatPlace'>
                {newMessage.map((msg:any, i:any) => (
                    <h1 key = {i}>{msg.text}</h1>
                ))}
                <div ref = {bottomScroll}></div>
            </div>
            <div className="ChatBox">
                <input id = "ChatVal"type='text' className='ChattingBox' placeholder='Message..'/>
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