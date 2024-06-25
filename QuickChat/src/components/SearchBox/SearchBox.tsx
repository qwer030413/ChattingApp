import './search.css'
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Axios from 'axios'
import toast from "react-hot-toast";
import { curUser } from '../login/Login';



export default function SearchBox(){
    const [search, setSearch] = useState("")

    function SearchUser(){
        console.log(search.trim())
            if(search.trim() != ''){
                // Axios.post("http://localhost:3000/AddFriend", {
                // Email: search,
                // myEmail: curUser,
                // }).then(res => {
                //     toast.success("Added Friend!", {id:"friend!"});
                //     console.log(res.data)
                // }).catch(err => {
                //     console.log(err)
                //     toast.error("Account Does not Exist!", {id:"friendDNE!"});
                
                // });
                Axios.post(`http://localhost:3000/friendReq/${curUser}/${search}`, {
                    Email: search,
                    myEmail: curUser,
                }).then(res => {
                    toast.success("Added Friend!", {id:"friend!"});
                    console.log(res.data)
                }).catch(err => {
                    console.log(err)
                    toast.error("Account Does not Exist!", {id:"friendDNE!"});
                
                });
                (document.getElementById("emailOfUser") as HTMLInputElement).value = "";
                setSearch("")
            }
            else{
                toast.error("Search Bar Cannot Be Blank!", {id:"Bklank!"});
            }
    }
    return(
        <>
        <div className='SearchBoxContainer'>
            <input id = "emailOfUser"type='text' className='SearchBox' onChange={(e) => setSearch(e.target.value)} placeholder='User Email..'/>
            <span>
                <div className='sline'></div>
                <BsSearch className='SearchIcon'onClick={() =>SearchUser()}/>
            </span>
            
        </div>
        </>
    );
}