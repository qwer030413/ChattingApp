import './accPages.css'
import { curUser, curName,setcurName, setCurBio, curBio } from '../login/Login';
import Axios from 'axios'
import { useEffect, useState } from 'react';
// import { setcurName, setCurBio } from '../login/Login';
import toast from "react-hot-toast";
export default function ProfilePage(){
    const [bio, setBio] = useState("")
    const [name, setUserName] = useState("")
    const [userName, setRealUsername] = useState("")
    const [userBio, setRealBio] = useState("")
    useEffect(() => {
        setRealUsername(curName)
        setRealBio(curBio)
    }, [])
    function saveProfileChanges(){
        if(name != ""){
            Axios.post("http://localhost:3000/account/changeName", {
                email: curUser,
                newName: name
            }).then(res => {
                console.log(res)
                setcurName(name)
                setRealUsername(name)
            }).catch(err => {
                console.log(err)
            })
        }
        Axios.post("http://localhost:3000/account/saveBio", {
                email: curUser,
                aboutMe: bio
            }).then(res => {
                console.log(res)
                setRealBio(bio)
                setCurBio(bio)
            }).catch(err => {
                console.log(err)
            })
        toast.success("Changes Saved!", {id:"userupdate!"});
    }
    return(
        <div className="profilePageContainer">
            <div className='settingTitle'>
                <div className='pline'></div>
                <text className='sTitle'>Profile</text>
            </div>
            <div className='ProfileBody'>
                <div className='SectionRow'>
                    <div className='Section'>
                        <text className='subTitle'>User Name</text>
                        <text className='UserInfo'>{userName}</text>
                    </div>
                    <div className='Section'>
                        <text className='subTitle'>Change User Name</text>
                        <input type='text' placeholder={userName} className='ChangeUsername' onChange={e => setUserName(e.target.value)}/>
                    </div>
                </div>
                <div className='SectionRow'>
                    <div className='Section'>
                        <text className='subTitle'>Email</text>
                        <text className='UserInfo'>{curUser}</text>
                    </div>
                    <div className='Section'>
                        <text className='subTitle'>About Me</text>
                        <textarea className='AboutMe' onChange={e => setBio(e.target.value)} defaultValue={userBio}/>
                    </div>
                </div>
            </div>
            <div className='SavingSection'>
                <button className='ProfileSaveBtn' onClick={saveProfileChanges}>Save</button>
            </div>
        </div>
    );
}