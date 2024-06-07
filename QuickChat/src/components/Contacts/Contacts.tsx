import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './contacts.css'
import { setCurUser } from "../login/Login";
import { useEffect, useState } from "react";
import Axios from 'axios'
import { curUser } from "../login/Login";
import { MdAccountBox } from "react-icons/md";
import { motion } from 'framer-motion';

// import { curChat } from "../Chatting/chattingcomp";
var curChatId = ""
import ChattingComp from "../Chatting/chattingcomp";
export default function Contacts(){
    const navigate = useNavigate(); 
    const[contacts, setContacts] = new Set(useState([] as any))
    const[currentContact, setCurContact] = useState("")
    // const [name, setName] = useState("")
    useEffect(() => {
        Axios.post("http://localhost:3000/contacts", {
            email: curUser,
        }).then(res => {
            console.log("working")
            for(let i = 0; i < res.data.length; i++)
            {
                Axios.post("http://localhost:3000/getName", {
                    email: res.data[i].email,
                }).then(res1 => {
                    setContacts((a: any) => [...a,
                    {email: res.data[i].email, name: res1.data[0].username}
                    ]);
                    // console.log(res1.data)
                })
                // setContacts((a: any) => [...a,
                // {email: res.data[i].email, name: res1.data[i].username}
                // ]);
            }
        })
        
        
    }, [])
    function changeCurChat(value : string)
    {
        setCurContact(value)
         Axios.post("http://localhost:3000/getFriendId", {
                email:value,
            }).then(res => {
                console.log(res.data[0].id)
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
            <div className="Contacts">
                {contacts.map((cont:any, i:any) => (
                    <>
                        <motion.div key={i} className='contactBoxes' 
                        onClick={() => changeCurChat(cont.email)}
                        whileHover={hover} 
                        whileTap={{scale:1,}}
                        transition={spring}

                        >
                            <MdAccountBox className='picPlaceHolder'/>

                            <div className='contactInfo'>
                                <text className="contactName">{cont.name}</text>
                                <text className='contactEmail'>{cont.email}</text>

                            </div>
                            
                        </motion.div>
                    </>
                    
                    ))}
            </div>
            <div className='accountProfile'>
                <div className="UserProfile">
                    <span className="pfpPlaceHolder"></span>
                    <text>welcome {curUser}</text>
                </div>
                
                <button onClick={LogOut} className="logOutButton">Logout</button>
            </div>
        </div>
            {ChattingComp(currentContact)}
        </div>
        
        </>
    );
}

export {curChatId};
