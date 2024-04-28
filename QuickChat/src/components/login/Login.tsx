
import './login.css';
import LoginButton from '../buttons/LoginButton';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import toast from "react-hot-toast";
import { useState } from 'react';
var curUser = ""
export default function LoginComp(){
    const navigate = useNavigate(); 
    const [tempEmail, setEmail] = useState("")
    const [tempPassword, setPassword] = useState("");
    function logUserIn(event: { preventDefault: () => void; }){
        if((document.getElementById("emailval") as HTMLInputElement).value.trim() != '' &&
        (document.getElementById("pwval") as HTMLInputElement).value.trim() != '')
        {
            event.preventDefault();
            Axios.post("http://localhost:3000/login", {
                Email: tempEmail,
                Password: tempPassword,
            }).then(res => {
                toast.success("Signed In!", {id:"loggedin!"});
                navigate("/chatHome")
                console.log(res.data[0].email)
                curUser = res.data[0].email
            }).catch(err => {
                console.log(err)
                toast.error("Account Does not Exist!", {id:"logindne!"});
            
            });
            (document.getElementById("emailval") as HTMLInputElement).value = "";
            (document.getElementById("pwval") as HTMLInputElement).value = "";
                
                
        }
      
        
    }
    return(
        <>
            <div className='LoginContainer'>
                <h1 className='loginTitle'>Login</h1>
                <form className='loginForm'>
                <input id = "emailval"type='email' className='SignIn' required= {true}  placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input id = "pwval" type="password" className='SignIn' required = {true} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                {LoginButton("Sign In", "LoginBtn",logUserIn)}
                {/* <BiSolidShow className='showPW'/> */}

                
                
            </form>
            </div>
        
        </>
    );
}
export function setCurUser(user:string){
    curUser = user
}
export {curUser}