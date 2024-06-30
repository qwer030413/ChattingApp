import './accPages.css'
import { curUser, curName } from '../login/Login';
export default function ProfilePage(){
    return(
        <div className="profilePageContainer">
            <div className='settingTitle'>
                <div className='pline'></div>
                <text className='sTitle'>Profile</text>
            </div>
            <div className='ProfileBody'>
                <div className='Section'>
                    <text>User Name</text>
                    <input type='text' placeholder={curName} className='ChangeUsername'/>
                    {/* <text>{curName}</text> */}
                </div>
                
            </div>
        </div>
    );
}