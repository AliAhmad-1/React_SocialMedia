import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import Users from '../Components/Users'
import { suggestion } from '../endpoints/api'

export default function Suggestion() {
  const [users,setUsers]=useState([])
  
  useEffect(()=>{
    const handle_suggestion=async()=>{
      const data=await suggestion();
      setUsers(data)
    }
    handle_suggestion()
  },[])
  const menu=()=>{
    const side_bar=document.getElementsByClassName('side-bar')[0]
    side_bar.classList.toggle('open')

  }
  return (
    <div className={'container-2'}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
            <h4>Suggested For You</h4>
            <p className={'menu'} onClick={menu}><RxHamburgerMenu /></p>
        </div>
    <div style={{padding:'0px 1rem'}}>
      <div className={'suggest'}>
        {users.length !==0 ?
        <>
        {users.map((user,index)=><Users key={index} user={user}/>)}
        </>
        :
        <>{users.length===0 && <p style={{color:'red',textAlign:'center',marginTop:'3rem',border:'1px solid red',padding:'11px'}}>There are no suggestion for you yet</p>}</>

        }



      </div>
      
      </div>  


    </div>
  )
}
