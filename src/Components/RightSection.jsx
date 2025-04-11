import React, { useEffect, useState } from 'react'
import {  suggestion } from '../endpoints/api'

import Users from './Users'

export default function RightSection() {

  const [users,setUsers]=useState([])
  const [isSidebarVisible,setIsSidebarVisible]=useState(false)


  useEffect(()=>{
    const handleResize=()=>{
      setIsSidebarVisible(window.innerWidth>700)
    }

    window.addEventListener('resize',handleResize)
    handleResize()
    return ()=>window.removeEventListener('resize',handleResize)
  },[])
  useEffect(()=>{
    if(isSidebarVisible){
      const handle_suggestion=async()=>{
        const data=await suggestion();
        setUsers(data)
      }
      handle_suggestion()
    }

  },[isSidebarVisible])

  return (
    <div className={'right-section'}>
      <h4>Suggested For You</h4>
      <div className={'suggest'}>
        {users.map((user,index)=> 
        <Users key={index} user={user}/>
        )}
        {users.length===0 && <p style={{color:'red',textAlign:'center',marginTop:'3rem',border:'1px solid red',padding:'11px'}}>There are no suggestion for you yet</p>}
      </div>
    </div>
  )
}
