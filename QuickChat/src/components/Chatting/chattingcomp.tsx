import './chatcomp.css'
import ChatTextBox from './chatText';



export default function ChattingComp(){
    let user = "Aditi"
    return(
         <div className="ChattingContent">
            <div className="Title">
                {user}
            </div>
            <div className='chatPlace'>
            
            </div>
            <ChatTextBox />
            
        </div>
    );
}