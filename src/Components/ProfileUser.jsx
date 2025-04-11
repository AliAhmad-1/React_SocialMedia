import React, { useContext } from 'react'
import img from '../media/images/new.webp'
import '../static/css/Profile.css'
import { CiCalendarDate } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { PiPasswordLight } from "react-icons/pi";
import Posts from '../Components/Posts';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from 'react-router-dom'
import no_pic from '../media/images/no_pic.png'
import { AuthContext } from '../contexts/useAuth';
import { FiSend } from "react-icons/fi";


export default function ProfileUser({myPosts,profileUser,deletepost}) {
    const {user}=useContext(AuthContext)
    const menu=()=>{
        const side_bar=document.getElementsByClassName('side-bar')[0]
        side_bar.classList.toggle('open')
    
      }


    
  return (
    <div className={'container-2'}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
        <h4>Profile</h4>
        <p className={'menu'} onClick={menu}><RxHamburgerMenu /></p>
    </div>

    <div className={'profile'}>
        <div className={'profile_img'}>
            <img src={img} alt="profile_user" />
            {profileUser.image ? 
            <img src={`${profileUser.image}`} alt="cover_user" className={'person_image'} />
            :
            <img src={no_pic} alt="cover_user" className={'person_image'} />

            }
        </div>
        <div className={'info'}>
            <p className={'username'}>{profileUser.username}</p>
            <p className={'bio'}>{profileUser.bio}</p>
            <p className={'date'}><CiCalendarDate  size={'17px'} style={{marginBottom:'-3px',marginRight:'5px'}}/> joined {profileUser.date_joined}</p>
            <div>
                <p> {profileUser.num_posts} <span> posts</span></p>
                <p> {profileUser.following_count}<span> Following</span></p>
                <p> {profileUser.follower_count}<span> Followers</span></p>
            </div>
            {user.id===profileUser.id ? 
                        <div>
                        <NavLink to={'/changepassword'}> <PiPasswordLight  style={{margin:'0 5px 0 0'}}/> Change Password</NavLink>
                        <NavLink to={''}> <FaUserEdit style={{margin:'0 5px 0 0'}} /> Edit Profile</NavLink>
                        </div>
                        :
                        <div>
                        <NavLink to={`/chats/${profileUser.id}`}> <FiSend  style={{margin:'0 5px 0 0'}}/> Send Message</NavLink>      
                        </div>

            }


            
        </div>
        <div className={'home'}>
            <div className={'posts'}>
                      {myPosts.map((post,index)=><Posts key={post.uid}  deletePost={deletepost} post={post} post_comments={post.post_comments}/>)}

            </div>
        </div>

    </div>

    </div>
  )
}
