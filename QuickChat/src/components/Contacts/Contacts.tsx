import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import contactBoxes from "./contactsbox";
import './contacts.css'
import { setCurUser } from "../login/Login";
import { useEffect, useState } from "react";
import Axios from 'axios'
import { curUser } from "../login/Login";
export default function Contacts(){
    const navigate = useNavigate(); 
    const[contacts, setContacts] = useState([] as any)
    useEffect(() => {
        Axios.post("http://localhost:3000/contacts", {
            email: curUser,
        }).then(res => {
            console.log("posting")
            //it will probs add valyes every time I get on the chat page
            for(let i = 0; i < res.data.length; i++)
            {
                setContacts((a: any) => [...a,
                {name: res.data[i].username, email: res.data[i].email}
                // {id: res.data[i].todoid, todo: res.data[i].content, completed: res.data[i].completed, editing: res.data[i].editing, workingOn: res.data[i].workingon}
                ]);
            }
        })
    }, [])

    function LogOut(){
        navigate("/")
        setCurUser("")
        toast.success("Logged Out!", {id:"logout"});
    }
    return(
        <>
        <div className="Contacts">
            {contacts.map((cont:any, i:any) => (
                contactBoxes(i,cont.name, cont.email)
                    // <h1 key = {i} className="contactslist">{cont.email}</h1>
                ))}
            <div className='accountProfile'>
                welcome {curUser}
                <button onClick={LogOut}>Logout</button>
            </div>
            
        </div>
        </>
    );
}