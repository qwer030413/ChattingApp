import ChatNavBar from "../components/chatNav/chatNavBar";
import "./pages.css"
import AccountProfile from "../components/AccountNavBar/accountProfile";




export default function Accounts(){
    return(
        <>
        <div className="ChatContainer">
            <ChatNavBar />
            <div className="AccountContainer">
                <AccountProfile />
                {/* <h1>My Account</h1>
                <h1>Email: {curUser}</h1> */}
            </div>
            
        </div>  
         
        </>
    );
}