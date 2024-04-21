
import ChatNavBar from "../components/chatNav/chatNavBar";
import "./pages.css"
import {Route,Routes } from 'react-router-dom';
import ChatHomeList from "./contactList";
import ChatPage from "./chatPage";
export default function ChatHome(){
    return(
        <div className="chatHome">
            <ChatNavBar />
            <body>
                <Routes>
                    <Route path = "/chatHomeList" element = {<ChatHomeList />} />
                    <Route path = "/chatPage" element = {<ChatPage />} />
                </Routes>
            </body>
            
        </div>
    );
}