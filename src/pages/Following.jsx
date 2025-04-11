import React, { useEffect, useState } from 'react'
import no_bic from '../media/images/no_pic.png'
import '../static/css/following.css'
import { follow_user, following } from '../endpoints/api'
import { RxHamburgerMenu } from "react-icons/rx";
import Loading from '../Components/Loading';

export default function Following() {
  const BASE_URL='https://majdahmad1234.pythonanywhere.com/'
  const [followingUser,setFollowingUser]=useState([])
  const [followingFound,setFollowingFound]=useState(false)
  const [lodaing,setLoading]=useState(true)

  useEffect(()=>{
    const handle_following_user=async()=>{
      const all_following_user=await following();
      setFollowingUser(all_following_user)
      setFollowingFound(true)
      setLoading(false)
    }
    handle_following_user();
  },[])
  const follow=async(user_id)=>{
    const res=await follow_user(user_id);
    if(res.action==='unfollow'){
      setFollowingUser(followingUser.filter((user)=>user.id !== user_id))
    }
    }

    const menu=()=>{
      const side_bar=document.getElementsByClassName('side-bar')[0]
      side_bar.classList.toggle('open')
    }
  return (
    <div className={ 'container-2'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
          <h4>Following</h4>
          <p className={'menu'} onClick={menu}><RxHamburgerMenu /></p>
          </div>

      <div className={'following'}>
        <div className={'folloing_user'}>

              {lodaing?
              <Loading/>
              :
              followingFound && followingUser.length===0 ? 
              <div className={'no-posts'}>There are no users i following you</div>
              :
              followingUser.map((user,index)=> 
                <div className={'user'} key={index}>
                  <div className={'right'}>
                      {user.img ? 
                      <img src={`${BASE_URL}${user.image}`} alt="no-bic" />
                      :
                      <img src={no_bic} alt="no-bic" />

                       }
                      
                      <div>
                          <p className={'username'}>{user.username}</p>
                          <p className={'date'}>Feb. 5, 2025</p>
                      </div>
                    </div>
                    <div className={'left'}>
                        <button onClick={(user_id)=>follow(user.id)}>Following</button>
                    </div>
                </div>
          )}
              






        </div>
            
      

      </div>
    </div>
  )
}
