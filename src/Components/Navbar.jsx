import React from 'react'
import { MdAdd } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaUserGear } from "react-icons/fa6";
// import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";


export default function Navbar({onAddPostClick}) {
  const menu=()=>{
    const side_bar=document.getElementsByClassName('side-bar')[0]
    side_bar.classList.toggle('open')

  }
  return (
  <div className={'nav-bar'}>
    <div className="container">
      <h4>Social Media</h4>
      <div>
      <NavLink to={'/profile'}><FaUserGear size={'15px'} /></NavLink>
      <button onClick={onAddPostClick}><MdAdd  size={'20px'}/></button>
      <p className={'menu'} onClick={menu} style={{margin:'4px 0 0 8px'}}><RxHamburgerMenu /></p>

      </div>
    </div>
  </div>
  )
}
