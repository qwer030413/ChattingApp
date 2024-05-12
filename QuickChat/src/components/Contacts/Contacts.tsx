import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './contacts.css'
import { setCurUser } from "../login/Login";
import { useEffect, useState } from "react";
import Axios from 'axios'
import { curUser } from "../login/Login";
import { MdAccountBox } from "react-icons/md";
// import { curChat } from "../Chatting/chattingcomp";

import ChattingComp from "../Chatting/chattingcomp";
export default function Contacts(){
    const navigate = useNavigate(); 
    const[contacts, setContacts] = new Set(useState([] as any))
    const[currentContact, setCurContact] = useState("")
    useEffect(() => {
        Axios.post("http://localhost:3000/contacts", {
            email: curUser,
        }).then(res => {
            console.log("posting")
            for(let i = 0; i < res.data.length; i++)
            {
                setContacts((a: any) => [...a,
                {name: res.data[i].username, email: res.data[i].email}
                ]);
            }
        })
    }, [])
    function changeCurChat(value : string)
    {
        setCurContact(value)
    }
    function LogOut(){
        navigate("/")
        setCurUser("")
        toast.success("Logged Out!", {id:"logout"});
    }
    return(
        <>
        <div className="WholeChatPage">
            <div className="Contacts">
                {contacts.map((cont:any, i:any) => (
                    <>
                        <div key={i} className='contactBoxes' onClick={() => changeCurChat(cont.email)}>
                            <MdAccountBox className='picPlaceHolder'/>

                            <div className='contactInfo'>
                                <text className='contactEmail'>{cont.email}</text>
                            
                            </div>
                            
                        </div>
                    </>
                    
                    ))}
                <div className='accountProfile'>
                    welcome {curUser}
                    <button onClick={LogOut}>Logout</button>
                </div>
            </div>
            {ChattingComp(currentContact)}
        </div>
        {/* <div className="Contacts">
            {contacts.map((cont:any, i:any) => (
                <>
                    <div key={i} className='contactBoxes' onClick={() => changeCurChat(cont.em)}>
                        <MdAccountBox className='picPlaceHolder'/>

                        <div className='contactInfo'>
                            <text className='contactEmail'>{cont.email}</text>
                        
                        </div>
                        
                    </div>
                </>
                   
                ))}
            <div className='accountProfile'>
                welcome {curUser}
                <button onClick={LogOut}>Logout</button>
            </div>
            
        </div> */}
        </>
    );
}
