
import ChatNavBar from "../components/chatNav/chatNavBar";
import "./pages.css"
import {Route,Routes } from 'react-router-dom';
import ChatHomeList from "./contactList";
import ChatPage from "./chatPage";
export default function ChatHome(){
    let component
    switch(window.location.pathname){
        case "#/chatHome/chatPage":
            component = <ChatPage />
            break

    }
    return(
        <>
        <div className="chatHome">
            <ChatNavBar />
            {/* <div className="ChatContainer"> */}
            {component}
                {/* <Routes>
                    <Route path = "/chatHome" element = {<ChatHomeList />} />
                    <Route path = "/chatHome/chatPage" element = {<ChatPage />} />
                </Routes> */}
            
            {/* </div> */}
            
            
            
        </div>
        
        
        </>
        
    );
}