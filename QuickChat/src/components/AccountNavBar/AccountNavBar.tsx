
import {useRef, useState } from "react";
import "./accNavBar.css"
import pic from './DefaultPFP.jpg'

export default function AccountNavBar(){
    const [pfp, setpfp] = useState<File | null>(null);
    const inputRef = useRef<any>(null);    
    const [tabs, setTabs] = useState(1);
    let minitabs = [
        {
            label:"Profile",
            id: 1
        },
        {
            label:"Account Settings",
            id: 2
        },
        
    ];
    function updateTabs(id: number)
    {
        setTabs(id);   
    }
    const fileSelected = (event: any) => {
        if (event.target.files.length > 0){
            setpfp(event.target.files[0])
        }
        
    }
    const handleImageClick: any  = () => {
        if (inputRef.current){
            inputRef.current.click();
        }
    }
    return(
        <div className="AccountNav">
            
            <img onClick = {handleImageClick}src={pfp === null ? pic : URL.createObjectURL(pfp)} alt="" className="profilePic"/>
            <input type="file" onChange={fileSelected} className="Upload" ref={inputRef}></input>
            <div className='accountsTab'>
                
                {minitabs.map((tab) =>(
                    <div
                    key={tab.id}
                    onClick={()=>updateTabs(tab.id)}
                    >
                        
                        

                    </div>
                ))}
            </div>

            <div className='minicontent'>
                <div className={tabs == 1? "showPomodoro" : "content"}>
                    <text>Add friends</text>
                </div>
                <div className={tabs == 2? "showShortBreak" : "content"}>
                    <text>Friend Requests</text>
                </div>
            </div>
        </div>
    );
}