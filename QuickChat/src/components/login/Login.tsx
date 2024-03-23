
import './login.css';
import LoginButton from '../buttons/LoginButton';
export default function LoginComp(){
    return(
        <>
            <div className='LoginContainer'>
                <h1 className='loginTitle'>Login</h1>
                <form className='loginForm'>
                
                <input id = "emailval"type='email' className='SignIn' required= {true}  placeholder='Email'/>
                <input id = "pwval" type="password" className='SignIn' required = {true} placeholder='Password' />
                {LoginButton("Sign In", "LoginBtn")}
                {/* <BiSolidShow className='showPW'/> */}

                
                
            </form>
            </div>
        
        </>
    );
}