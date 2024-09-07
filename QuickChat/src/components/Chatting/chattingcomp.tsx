import { useEffect, useRef, useCallback, useState } from 'react';
import './chatcomp.css'
import { io } from 'socket.io-client';
import Axios from 'axios'
import { curUser, curName } from '../login/Login';
import { curChatId } from '../Contacts/Contacts';
import { motion } from 'framer-motion';
import chatMsgs from './chatMessages';
import pic from '../AccountNavBar/DefaultPFP.jpg'
import ChatProfilePop from '../Popups/ChatProfilePop';
import { IoSend } from "react-icons/io5";
import toast from 'react-hot-toast';

var curChat = ""
var initialId = 0;
export default function ChattingComp(currentChat:string, newMessage: any, setNewMessage:any, curUserName:string, curProfilePic:string){
    // const socket = io("http://localhost:3001")
    var socket = io('http://localhost:3001', { transports : ['websocket'] });
    const bottomScroll = useRef<HTMLDivElement>(null)    
    const [curChatPFP, setCurChatPFP] = useState("")
    const[showPop, setShowPop] = useState(false)
    const [userBio, setUserBio] = useState("")
    const [search, setSearch] = useState('')
    const [msgCount, setMsgCount] = useState(0)
    const date = new Date();
    // const showTime = date.getHours() 
    //     + ':' + date.getMinutes() 
    //     + ":" + date.getSeconds();
    useEffect(() => {
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

    useEffect(() => {
        Axios.post("http://localhost:3000/chats/getChatPFP", {
            email: currentChat
        }).then(res => {
            setCurChatPFP(res.data[0].PFP)
            setUserBio(res.data[0].Bio)
        })
        setShowPop(false)
    }, [currentChat])

    // Use the useEffect hook to set up the timer
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('hi')
            setMsgCount(msgCount => msgCount = 0)
        }, 5000)

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval)
    }, [])

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
        let time = new Date()
        // time.setHours(0, 0, 0, 0);
        // const strDateLA = time.toLocaleString("en-US", {
        //     timeZone: "America/Los_Angeles",
        // });
        // const offset = (new Date(strDateLA) - time) / (1000 * 60 * 60);

        // Axios.post("http://localhost:3000/StoreContactActivity", {
        //     myEmail:curUser,
        //     email: currentChat, 
        //     activity: showTime,
        // }).then(res => { 
            
        // })
        if (msg != "" && msgCount < 15){
            Axios.post("http://localhost:3000/chats/StoreChats", {
                fromEmail:curUser,
                toEmail: currentChat, 
                text: msg,
                time: time.toString()
            }).then(res => {
                setMsgCount(msgCount => msgCount + 1)
            })
             setNewMessage([
                ...newMessage,
                {email: curUser, text: msg, id: initialId + 1, time:time}
            ])
            socket.emit('send-message', msg, curChatId)
            if( document.getElementById("ChatVal")){
                (document.getElementById("ChatVal") as HTMLInputElement).value = ""
            }
        }
        else{
            toast.error("Too Many Messages!", {id:"tooMany!"});
        }
        initialId = initialId + 1;
    }


    useEffect(() => {
        if(bottomScroll.current){
            bottomScroll.current.scrollIntoView();
        }
    }, [sendMessage])

    function showPopUp(){
        if(showPop){
            setShowPop(false)
        } 
        else{
            setShowPop(true)
        }
    }
    return(
         
         <div className="ChattingContent"> 
            {(currentChat.trim() != ''? 
            (<>
                {ChatProfilePop(showPop, setShowPop, curChatPFP, currentChat, curUserName, userBio)}
                <div className="Title">
                    <div className='TitleSection'>
                        <img src = {curChatPFP === null ? pic : 'http://localhost:3000/' + curChatPFP} className="chatTopPFP" onClick={showPopUp}/>
                        <div className='EmailOfUser'>
                            {currentChat}
                        </div>
                        <div className='line'></div>
                        <div className='NameOfUser'>
                            {curUserName}
                        </div>
                    </div>
                    <div className="messageSearch"> 
                        <input type="text" className="messageSearchBar" placeholder="Search For Chats (username)" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    {/* {currentChat} */}
                </div>
                {/* {ChatProfilePop(showPop, setShowPop)} */}
                <div className='chatPlace'>
                    {newMessage.filter((msg: any) => {
                        return search.toLowerCase() === ''? msg: msg.text.toLowerCase().includes(search)
                    }).map((msg:any, i:any) => (
                        // <h1 key = {i}>{msg.text}</h1>
                        chatMsgs(msg.text, msg.email, i, curProfilePic, curChatPFP, msg.time)
                    ))}
                    <div ref = {bottomScroll}></div>
                </div>
                <div className="ChatBox">
                    <input id = "ChatVal"type='text' className='ChattingBox' placeholder='Message..' />
                    <motion.div className='SendBtn' onClick={() => sendMessage()}>
                        <IoSend />

                    
                    </motion.div>
                </div>
            
            </>
            ):
            ("")
            
            )}
            
        </div>
    );
}

export function changeCurContact(email:string)
{
    curChat = email
}
export {curChat}