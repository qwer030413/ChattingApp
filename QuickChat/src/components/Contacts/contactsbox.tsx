
import './contacts.css'
import { MdAccountBox } from "react-icons/md";



export default function contactBoxes(key: number,name: string, email: string){


    return(
        <>
        <div key={key} className='contactBoxes'>
            <MdAccountBox className='picPlaceHolder'/>

            <div className='contactInfo'>
                <text className='contactName'>{name}</text>
                <text className='contactEmail'>{email}</text>
            
            </div>
            
        </div>
        </>
    );
}