import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import './contacts.css'
import { curUser } from '../login/Login';
import { setCurUser } from "../login/Login";
export default function Contacts(){
    const navigate = useNavigate(); 
    function LogOut(){
        navigate("/")
        setCurUser("")
        toast.success("Logged Out!", {id:"logout"});
    }
    return(
        <>
        <div className="Contacts">
            <div className='accountProfile'>
                welcome {curUser}
                <button onClick={LogOut}>Logout</button>
            </div>
            
        </div>
        </>
    );
}