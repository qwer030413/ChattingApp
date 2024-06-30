import './accPages.css'
import { curUser, curName } from '../login/Login';
import Axios from 'axios'
import { useState } from 'react';
export default function ProfilePage(){
    const [bio, setBio] = useState("")
    const [name, setUserName] = useState("")
    function saveProfileChanges(){
        console.log(bio)
        if(name != ""){
            Axios.post("http://localhost:3000/changeName", {
                email: curUser,
                newName: name
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
        Axios.post("http://localhost:3000/saveBio", {
                email: curUser,
                aboutMe: bio
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
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
                        <text className='UserInfo'>{curName}</text>
                    </div>
                    <div className='Section'>
                        <text className='subTitle'>Change User Name</text>
                        <input type='text' placeholder={curName} className='ChangeUsername' onChange={e => setUserName(e.target.value)}/>
                    </div>
                </div>
                <div className='SectionRow'>
                    <div className='Section'>
                        <text className='subTitle'>Email</text>
                        <text className='UserInfo'>{curUser}</text>
                    </div>
                    <div className='Section'>
                        <text className='subTitle'>About Me</text>
                        <textarea className='AboutMe' onChange={e => setBio(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className='SavingSection'>
                <button className='ProfileSaveBtn' onClick={saveProfileChanges}>Save</button>
            </div>
        </div>
    );
}