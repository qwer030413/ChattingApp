
import './login.css';
import LoginButton from '../buttons/LoginButton';
import { useNavigate } from "react-router-dom";
export default function LoginComp(){
    const navigate = useNavigate(); 
    function logUserIn(){

    }
    return(
        <>
            <div className='LoginContainer' onSubmit={() =>navigate("/chatHome")}>
                <h1 className='loginTitle'>Login</h1>
                <form className='loginForm'>
                <input id = "emailval"type='email' className='SignIn' required= {true}  placeholder='Email'/>
                <input id = "pwval" type="password" className='SignIn' required = {true} placeholder='Password' />
                {LoginButton("Sign In", "LoginBtn",logUserIn)}
                {/* <BiSolidShow className='showPW'/> */}

                
                
            </form>
            </div>
        
        </>
    );
}