
import ChatNavBar from "../components/chatNav/chatNavBar";
import "./pages.css"
import Contacts from "../components/Contacts/Contacts";
import SearchBox from "../components/SearchBox/SearchBox";
import MiniTab from "../components/friendsTab/animatedtab";

export default function ChatHome(){
    
    
    return(
        <>
        <div className="chatHome">
            <ChatNavBar />
            {/* <Contacts/> */}
            <div className="HomePage">
                {/* <h1>Add friends</h1>
                <SearchBox /> */}
                < MiniTab />
            </div>
            
            
            
        </div>
        
        
        </>
        
    );
}