import { useEffect, useRef, useCallback } from 'react';
import './chatcomp.css'
import { io } from 'socket.io-client';
import Axios from 'axios'
import { curUser } from '../login/Login';
import { curChatId } from '../Contacts/Contacts';
import { motion } from 'framer-motion';
import chatMsgs from './chatMessages';
var curChat = ""
var initialId = 0;
export default function ChattingComp(currentChat:string, newMessage: any, setNewMessage:any){
    // const socket = io("http://localhost:3001")
    var socket = io('http://localhost:3001', { transports : ['websocket'] });
    const bottomScroll = useRef<HTMLDivElement>(null)    
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
    const checkKeyPress = useCallback((e: { keyCode: any; }) => {
        const {keyCode } = e;
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
                    email: curChat, text: a, id: initialId
                }])
                initialId = initialId + 1
            })
        }
    }
    useEffect(() => { 
        receiveMessage();
    }, [socket]);



    function sendMessage(){
        var msg = (document.getElementById("ChatVal") as HTMLInputElement).value
        Axios.post("http://localhost:3000/StoreChats", {
            fromEmail:curUser,
            toEmail: currentChat, 
            text: msg
        }).then(res => {
        })
        if (msg != ""){
             setNewMessage([
                ...newMessage,
                {email: curUser, text: msg, id: initialId + 1}
            ])
            socket.emit('send-message', msg, curChatId)
            if( document.getElementById("ChatVal")){
                (document.getElementById("ChatVal") as HTMLInputElement).value = ""
            }
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
            {(currentChat.trim() != ''?
            (<>
                <div className="Title">
                    {currentChat}
                </div>
                <div className='chatPlace'>
                    {newMessage.map((msg:any, i:any) => (
                        // <h1 key = {i}>{msg.text}</h1>
                        chatMsgs(msg.text, msg.email, i)
                    ))}
                    <div ref = {bottomScroll}></div>
                </div>
                <div className="ChatBox">
                    <input id = "ChatVal"type='text' className='ChattingBox' placeholder='Message..' />
                    <motion.button className="SendBtn"
                    onClick={() =>sendMessage()}
                    >
                    Send</motion.button>
                </div>
            
            </>
            ):
            (
            <>
                    
            </>
            )
            
            )}
            
        </div>
    );
}

export function changeCurContact(email:string)
{
    curChat = email
}
export {curChat}