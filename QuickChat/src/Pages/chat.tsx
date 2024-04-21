
import ChatNavBar from "../components/chatNav/chatNavBar";
import "./pages.css"
import Contacts from "../components/Contacts/Contacts";
export default function ChatHome(){
    
    return(
        <>
        <div className="chatHome">
            <ChatNavBar />
            <Contacts/>
            <h1>Chat Home</h1>
            
            
            
        </div>
        
        
        </>
        
    );
}