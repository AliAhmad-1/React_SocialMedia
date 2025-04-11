import no_bic from '../media/images/no_pic.png'
import { RxHamburgerMenu } from "react-icons/rx";
import '../static/css/chat.css'
import {  useEffect, useState } from 'react';
import { all_chats } from './../endpoints/api';

import { Link } from 'react-router-dom';


export default function Allchats() {

    const [chats,setChats]=useState([])

    useEffect(()=>{
        const get_chats=async()=>{
            const data=await all_chats();
            console.log(data)
            setChats(data)

            }

        get_chats();

    },[])



  const menu=()=>{
    const side_bar=document.getElementsByClassName('side-bar')[0]
    side_bar.classList.toggle('open')

  }



  return (

    <div className={'container-2'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
          <h4>All Chats</h4>
          <p className={'menu '} onClick={menu}><RxHamburgerMenu /></p>
          </div>
          

          <div className={'home'}>
            <div className={'chats'}>
                {chats.map((chat,index)=>{
                const participant=chat.user_detail
                

                    return(
                        <div className={'one_chat'} key={chat.id}>
                        <div>
                            {participant.image ?
                            <img src={`${participant.image}`} alt="person_img" />
                            :
                            <img src={no_bic} alt="person_img" />
                            }
                            {participant.online_status && 
                            <span className={'online'} ></span>
                            }
                            
                            
                            <div>
                                <Link to={`${participant.id}`} style={{textDecoration:'none'}}>
                                {participant && <p className={'username'}>{participant.username}</p>}
                                </Link>
                                {chat.last_message && <p className={'lastmessage'}>{chat.last_message.text}</p> }

                                
                            </div>
                        </div>
                        <p className={'start_time'}>{chat.start_time}</p>
                        </div>
                    )
                }

                )}


            </div>
          </div>
    </div>

  )
}
