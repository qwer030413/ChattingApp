
import './contacts.css'
export default function contactBoxes(key: number,name: string, email: string){


    return(
        <>
        <div key={key} className='contactBoxes'>
            <text className='contactName'>{name}</text>
            <text className='contactEmail'>{email}</text>
        </div>
        </>
    );
}