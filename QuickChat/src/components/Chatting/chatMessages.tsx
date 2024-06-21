

import './chatcomp.css'
export default function chatMsgs(message : string, user : string, id: number){
    return(
        <div className="ChatMsg">
            <text className="userName">{user}</text>
            <text className="message">{message}</text>
        </div>
    );
}