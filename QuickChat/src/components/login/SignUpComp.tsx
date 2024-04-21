import { useEffect, useState } from "react";
import LoginButton from "../buttons/LoginButton";
import './login.css'
import Axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUpContainer(){
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("")
    const [Name, setName] = useState("");
    const navigate = useNavigate(); 
    useEffect(() => {
        const handleEsc = (event: { key: string; }) => {
           if (event.key === 'Escape') {
            navigate("/")
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);
    function goBack(){
        navigate("/")
        console.log("a")
    }
    function SignUserIn(event: { preventDefault: () => void; }){
        console.log("a")
        if((document.getElementById("emailval") as HTMLInputElement).value.trim() != '' &&
        (document.getElementById("pwval") as HTMLInputElement).value.trim() != '' && 
        (document.getElementById("repeatpw") as HTMLInputElement).value.trim() != '' &&
        (document.getElementById("UserName") as HTMLInputElement).value.trim() != ''
        ){
            event.preventDefault();
            if(Password != secondPassword)
            {
                toast.error("Password do not match!", {id:"pwdontMatch!"});
            }
            else{
                
                setEmail(Email);
                setPassword(Password);
                Axios.post("http://localhost:3000/signUp", {
                    newEmail: Email,
                    newPassword: Password,
                    newName: Name
                }).then(res => {
                    toast.success("Account Created!", {id:"accreated!"});
                    navigate("/")
                    console.log("worked")
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                    console.log("weird")
                    toast.error("Email taken, Try a different Email!", {id:"logindne!"});
                
                });
                (document.getElementById("emailval") as HTMLInputElement).value = "";
                (document.getElementById("pwval") as HTMLInputElement).value = "";
                (document.getElementById("repeatpw") as HTMLInputElement).value = "";
                (document.getElementById("UserName") as HTMLInputElement).value = "";
                
                
            }
        }
        
        else{
            toast.error("Enter a valid Email and Password!", {id:"enterep!"});
        }
        
        
    
    }
    
    return(
        <>
            <button onClick={() =>goBack()}>Go back</button>
            <div className="SignUpCont">
                <h1 className="signupHeader">Get Started</h1>
                <input id = "UserName"type='text' className='SignIn' required= {true}  onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                <input id = "emailval"type='email' className='SignIn' required= {true} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                <input id = "pwval" type="password" className='SignIn' required = {true} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <input id = "repeatpw" type="password" className='SignIn' required = {true} onChange={(e) => setSecondPassword(e.target.value)} placeholder='Repeat Password' />
                {LoginButton("Sign Up", "LoginBtn", SignUserIn)}
            </div>
        </>
    );
}