import "./accNavBar.css"
import {useEffect, useRef, useState } from "react";
// import AccountNavBar from "./AccountNavBar";
import MyAccount from "../AccountPages/MyAcount";
import ProfilePage from "../AccountPages/ProfilePage";
import pic from './DefaultPFP.jpg'
import { curUser } from "../login/Login";
import Axios from 'axios'
import {motion} from "framer-motion";

export default function AccountProfile(){

    const [pfp, setpfp] = useState<File | null>(null);
    const [url, setUrl] = useState("")
    //  const [pfp, setpfp] = useState()
    const inputRef = useRef<any>(null);    
    const [tabs, setTabs] = useState(1);
    useEffect(() => {
        Axios.post("http://localhost:3000/getPFP", {
                email: curUser
            }).then(res => {
                setUrl(res.data[0].PFP)
            }).catch(err => {
                console.log(err)
            })
    }, [])
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
            const formdata = new FormData();
            formdata.append('image', event.target.files[0]);
            formdata.append('email',curUser)
            console.log(event.target.files[0])
            Axios.post("http://localhost:3000/SetPFP",formdata)
            .then(res =>{
                setUrl(res.data)
            })
        }
        
    }
    const handleImageClick: any  = () => {
        if (inputRef.current){
            inputRef.current.click();
        }
    }
    return(
        <div className="AccountProfile">
            <div className="AccountNav">
            
            <img onClick = {handleImageClick}src={url === null ? pic : 'http://localhost:3000/' + url} alt="" className="profilePic"/>
            <input name="image" type="file" onChange={fileSelected} className="Upload" ref={inputRef}></input>
            <text className="AccountName">{curUser}</text>
            <div className="horizontalLine"></div>
            <div className='accountsTab'>
                
                {minitabs.map((tab) =>(
                    <div key={tab.id} onClick={()=>updateTabs(tab.id)} className={`a${tabs === tab.id? "TabButtons" : "tabSelect"}`}>
                    {/* {tab.label} */}
                    {tabs === tab.id && (
                            
                        <motion.div layoutId='accTabs' className="accountsTabIndicator" transition={{duration:0.5, type: "spring", stiffness: 400, damping: 38}}/>
                    )}
                    <span className='accTabHighlight'>{tab.label}</span>

                    </div>
                ))}
            </div>
        </div>
        <div className='AccountContent'>
                <motion.div className={tabs == 1? "showAccountTabs" : "dontShow"}>
                    <ProfilePage />
                </motion.div>
                <motion.div className={tabs == 2? "showAccountTabs" : "dontShow"}>
                    <MyAccount />
                </motion.div>
            </div>
        
        
        
        </div>
        
    );
}