import React, {  useContext} from 'react'
import { HiLogout } from "react-icons/hi";
import { GiSaveArrow } from "react-icons/gi";
import { FaUserGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import no_bic from '../media/images/no_pic.png'
import {  NavLink, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";





import '../static/css/Sidebar.css'
import { logout } from '../endpoints/api';
import { PiUsersThreeLight } from "react-icons/pi";
import { AuthContext } from '../contexts/useAuth';



export default function Sidebar() {
  const {user}=useContext(AuthContext)

  const nav=useNavigate()

  const logout_user=()=>{
    logout().then(
      (res)=>{
        nav('/login')
        
      }
    )
  }


  const closeSidebar=()=>{
    const side_bar=document.getElementsByClassName('side-bar')[0]
    side_bar.classList.remove('open')
  }

  return (
    
    <div className={'side-bar'}>
      <div className={'close_sidebar'}>
      <IoCloseSharp cursor={'pointer'} size={'20px'} onClick={closeSidebar} style={{position:'absolute',right:'12px'}}/>
      </div>
      <div className={'container'}>
        
        <ul>
           
            <li><NavLink to='/'  onClick={closeSidebar}><FaHome />Home</NavLink></li>
            <li><NavLink to={'/following'} onClick={closeSidebar}><HiMiniUsers />Following</NavLink></li>
            <li><NavLink to='/posts/saved'onClick={closeSidebar}><GiSaveArrow />Saved</NavLink></li>
            <li><NavLink to='/profile'onClick={closeSidebar}><FaUserGear />Profile</NavLink></li>
            <li><NavLink to='/suggestion'onClick={closeSidebar}><PiUsersThreeLight />Suggestion</NavLink></li>
            <li><NavLink to='/chats'onClick={closeSidebar}><BsChatSquareTextFill />Chats</NavLink></li>

        </ul>
        <div className={'person-logout'}>
          <div className={'right-person'}>
          
            {user.image ? 
            
            <img src={`${user.image}`} alt="user_image" />
            :
            <img src={no_bic} alt="no-image" width={'50px'}/>
            }
          
            <div>
                <p className={'username'}>{user.username}</p>
                <p className={'join-date'}>{user.date_joined}</p>
            </div>
          </div>

          <HiLogout size={'20px'} color={'red'} className={'logout'} onClick={logout_user}/>
            


        </div>


        </div>

    </div>
  )
}
