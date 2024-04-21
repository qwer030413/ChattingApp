import "./pages.css"
import Contacts from "../components/Contacts/Contacts";
import ChatNavBar from "../components/chatNav/chatNavBar";
import ChattingComp from "../components/Chatting/chattingcomp";


export default function ChatPage(){
    return(
        <div className="chatHome">
            <ChatNavBar /> 
            <Contacts />
            <ChattingComp />
        </div>
        
    );
}