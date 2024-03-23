import LoginButton from "../buttons/LoginButton";
import './login.css'
export default function SignUpContainer(){
    return(
        <>
            {LoginButton("Go Back", "goback", "/")}
            <div className="SignUpCont">
                <h1 className="signupHeader">Get Started</h1>
                <input id = "emailval"type='email' className='SignIn' required= {true}  placeholder='Email'/>
                <input id = "pwval" type="password" className='SignIn' required = {true} placeholder='Password' />
                {LoginButton("Sign Up", "LoginBtn")}
            </div>
        </>
    );
}