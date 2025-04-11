import React, { useState } from 'react'
import no_bic from '../media/images/no_pic.png'
import { follow_user } from '../endpoints/api';
export default function Users({user}) {
    const BASE_URL='https://majdahmad1234.pythonanywhere.com/'
    const [action,setAction]=useState('Follow')
    const follow=async(user_id)=>{
        const res=await follow_user(user_id);
        if(res.action==='follow'){
          setAction('UnFollow')
        }
        else{
          setAction('Follow')
        }
      }
  return (
    <div className={'top-section'} key={user.id}>
    <div className={'right'}>
    {user.img ? 
          <img src={`${BASE_URL}${user.image}`} alt="no-bic" />
          :
          <img src={no_bic} alt="no-bic" />

    }
      
      <div>
        <p>{user.username}</p>
        <p style={{fontSize:'11px',
  color:'rgba(42, 37, 37, 0.77)'}}>Feb. 5, 2025</p>
      </div>
    </div>
    <div className={'left'}>
      <span onClick={(user_id)=>follow(user.id)}>{action}</span>
    </div>

  </div>
  )
}
