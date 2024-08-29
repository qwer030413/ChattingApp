
import { useState } from 'react';
import './accPages.css'
import { curUser } from '../login/Login';
import Axios from 'axios'
import toast from "react-hot-toast";

export default function MyAccount(){
    const [realPassword, setRealPassword] = useState('')
    const [oldPasssword, setOldPassword] = useState('')
    const [password1, setPassword1] = useState('') 
    const [password2, setPassword2] = useState('') 
    function changePassword(){
        if(password1.trim() != '' && password1.trim() == password2.trim()){
            Axios.post("http://localhost:3000/account/getAccount", {
                email: curUser
            }).then(res => {
                setRealPassword(res.data[0].pw)
            }).catch(err => {
                console.log(err)
            })
            if(realPassword.trim() == oldPasssword.trim()){
                Axios.post("http://localhost:3000/account/changePassword", {
                    email: curUser,
                    newPw: password1
                }).then(res => {
                    toast.success("Password Changed!", {id:"pwUpdate!"});
                    if(document.getElementById("oldpw") && document.getElementById("newpw1") && document.getElementById("newpw2")){
                        (document.getElementById("oldpw") as HTMLInputElement).value = "";
                        (document.getElementById("newpw1") as HTMLInputElement).value = "";
                        (document.getElementById("newpw2") as HTMLInputElement).value = "";
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            else{
                toast.error("Incorrect Old Password", {id:"badpwUpdate"});
            }
        }
        else{
            toast.error("New passwords do not match", {id:"badpwUpdate"});
        }
    }
    return(
        <div className="profilePageContainer">
            <div className='settingTitle'>
                <div className='pline'></div>
                <text className='sTitle'>Account Settings</text>
            </div>
            <div className='ProfileBody'>
                <div className='Section'>
                    <text className='subTitle'>Change Password</text>
                    <input type='text' id = 'oldpw'placeholder={'Old Password'} className='ChangeUsername' onChange={e => setOldPassword(e.target.value)}/>
                    <input type='text' id = 'newpw1' placeholder={'New Password'} className='ChangeUsername' onChange={e => setPassword1(e.target.value)}/>
                    <input type='text' id = 'newpw2' placeholder={'Repeat New Password'} className='ChangeUsername' onChange={e => setPassword2(e.target.value)}/>

                </div>
            </div>
            <div className='SavingSection'>
                <button className='ProfileSaveBtn' onClick={changePassword}>Save</button>
            </div>
        </div>
    );
}