import { curUser } from "../components/login/Login";
import ChatNavBar from "../components/chatNav/chatNavBar";





export default function Accounts(){
    return(
        <>
        <div className="ChatContainer">
            <ChatNavBar />
            <div className="AccountContainer">
                <h1>My Account</h1>
                <h1>Email: {curUser}</h1>
            </div>
            
        </div>  
        
        </>
    );
}