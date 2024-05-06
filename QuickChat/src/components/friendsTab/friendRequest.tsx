

import FriendBox from './friendReqBox';
import Axios from 'axios'
import './animatedtab.css'
import { useEffect, useState } from 'react';
import { curUser } from '../login/Login';
export default function FriendRequests(){
    const [requests, setRequests] = useState([] as any)
    useEffect(() => {
        Axios.post("http://localhost:3000/getFriendReq", {
            email: curUser,
        }).then(res => {
            for(let i = 0; i < res.data.length; i++)
            {
                setRequests((a: any) => [...a,
                {email: res.data[i].fromEmail}
                ]);
            }
        })
    }, [])
    function handleRemoveItem(email:string) {
        console.log(email)
        // setRequests(requests.filter((item: { email: string; }) => item.email !== email))
        // Axios.post("http://localhost:5172/deleteRequest", {
                
        //     recieveEmail: curUser,
        //     fromEmail: email

        // });
    }
    return(
        <>
        <div className='FriendReqContainer'>
            {requests.map((cont:any, i:any) => (
            FriendBox(i, cont.email, handleRemoveItem(cont.email))
                // <h1 key = {i} className="contactslist">{cont.email}</h1>
            ))}
        </div>
        </>
    );
}