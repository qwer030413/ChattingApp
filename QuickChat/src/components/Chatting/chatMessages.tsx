import pic from '../AccountNavBar/DefaultPFP.jpg'
import './chatcomp.css'
import { curUser } from '../login/Login';
import { useEffect, useState } from 'react';
export default function chatMsgs(message : string, user : string, id: number, PFP1: string, PFP2: string, time:string){
    // const [userPFP, setUserPFP] = useState("")
    let p = ""
    if (curUser == user){
        // setUserPFP(PFP1)
        p = PFP1
    }
    else{
        // setUserPFP(PFP2)
        p = PFP2
    }
    return(
        <div className="ChatUserProfile">
            <img src = {p === null ? pic : 'http://localhost:3000/' + p} className="chatPFP"/>
            <div className='ChatMsg'>
                <div className='TimeContainer'>
                    <text className="userName">{user}    :</text>
                    {(time? (<text>{time.toString().substring(4,25)}</text>):(''))}
                </div>
                <text className="message">{message}</text>
            </div>
        </div>
    );
}