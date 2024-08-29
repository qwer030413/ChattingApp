import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './contacts.css'
import { curName, setCurUser, curUser } from "../login/Login";
import { useCallback, useEffect, useState } from "react";
import Axios from 'axios'
import { motion } from 'framer-motion';
import { changeCurContact } from "../Chatting/chattingcomp";
import pic from '../AccountNavBar/DefaultPFP.jpg'
// import { curChat } from "../Chatting/chattingcomp";
var curChatId = ""
var initialId = 0;
import ChattingComp from "../Chatting/chattingcomp";
export default function Contacts(){
    const navigate = useNavigate(); 
    const[contacts, setContacts] = new Set(useState([] as any))
    const [Messages, setMessages] = useState([] as any)
    const[currentContact, setCurContact] = useState("")
    const [curUserName, setCurUserName] = useState("")
    const [curPFP, setCurPFP] = useState("")
    // const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState('')
    // const [name, setName] = useState("")
    useEffect(() => {
        Axios.post("http://localhost:3000/users/contacts", {
            email: curUser,
        }).then(res => {
            for(let i = 0; i < res.data.length; i++)
            {
                Axios.post("http://localhost:3000/users/getName", {
                    email: res.data[i].email,
                }).then(res1 => {
                    // console.log(res1.data[0].PFP)
                    setContacts((a: any) => [...a,
                    {email: res.data[i].email, name: res1.data[0].username, pfp: res1.data[0].PFP, activity: res.data[i].activity}
                    
                    ]);
                })
            }

        })
        
        
    }, [])
    const checkKeyPress = useCallback((e: { keyCode: any; }) => {
        const {keyCode } = e;
        if (keyCode === 13) {
            console.log('press')
            // setUpdate(update => !update)
        }
    },[]);
    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress);
        return () => {
        window.removeEventListener("keydown", checkKeyPress);
        };
    }, [checkKeyPress]);
    // useEffect(() => {
    //     contacts.sort((a: any, b: any) => 
    //     {if (a.activity < b.activity)
    //         return 1

    //     if (a.activity > b.activity)
    //         return -1

    //     return 0});

    // }, [update])
    useEffect(() => {
        Axios.post("http://localhost:3000/chats/DisplayMessages", {
            fromEmail:curUser,
            toEmail: currentContact,
        }).then(res => {
            //this is needed to reset the array everytime we change chats dont delete it T_T
            setMessages([]); 
            for(let i = 0; i < res.data.length; i++)
            {
                setMessages((a: any) => [...a,
                // {text: res.data[i].chat, id: initialId + 1} 
                {email: res.data[i].fromEmail, text: res.data[i].chat, id: initialId + 1}
                ]);
                initialId = initialId + 1;
            }
        }).catch(err => {
            console.log(err)
        
        });

    }, [currentContact])
    useEffect(() => {
        Axios.post("http://localhost:3000/chats/getUserName", {
            email: currentContact
        }).then(res => {
            setCurUserName(res.data[0].username)
        })
    }, [currentContact])
    useEffect(() => {
        Axios.post("http://localhost:3000/account/getCurUserPFP", { 
            email: curUser
        }).then(res => {
            setCurPFP(res.data[0].PFP)
        })
    }, [])
    function changeCurChat(value : string)
    {
        setCurContact(value)
        changeCurContact(value)
        // console.log(currentContact)
         Axios.post("http://localhost:3000/users/getFriendId", {
                email:value,
            }).then(res => {
                curChatId = res.data[0].id
        });
    }
    function LogOut(){
        navigate("/")
        setCurUser("")
        toast.success("Logged Out!", {id:"logout"});
    }
    const spring = {
        type: "spring",
        damping: 17,
        stiffness: 900,
    }
    const hover = {
        scale: 1.03,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        
    }
    return(
        <>
        <div className="WholeChatPage">
            <div className="contactBar">
                <div className="ChatsSearch">
                    <input type="text" className="ChatsSearchBar" placeholder="Search For Chats" onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="ChatsHeader">
                    <text style={{fontWeight:'bold'}}>Chats</text>
                </div>
                <div className="Contacts">
                    {contacts.map((cont:any, i:any) => (
                        <>
                            <motion.div key={i} className='contactBoxes' 
                            onClick={() => changeCurChat(cont.email)}
                            whileHover={hover} 
                            whileTap={{scale:1,}}
                            transition={spring}

                            >
                                {/* <MdAccountBox className='picPlaceHolder'/> */}
                                <img src = {cont.pfp === null ? pic : 'http://localhost:3000/' + cont.pfp} className="ContactPFP"/>

                                <div className='contactInfo'>
                                    <text className="contactName">{cont.name}</text>
                                    <text className='contactEmail'>{cont.email}</text>

                                </div>
                                
                            </motion.div>
                        </>
                        
                        ))}
                </div>
                <div className='accountProfile'>
                    <div className="UserProfile" >
                        {/* <span className="pfpPlaceHolder"></span> */}
                        <img src = {curPFP === null ? pic : 'http://localhost:3000/' + curPFP} className="pfpPlaceHolder"/>
                        <text className="ShowProfile">{curName}</text>
                    </div>
                    
                    <button onClick={LogOut} className="logOutButton">Logout</button>
                </div>
            </div>
            {ChattingComp(currentContact, Messages, setMessages, curUserName, curPFP)}
        </div>
        
        </>
    );
}

export {curChatId};
