import React, { useContext, useState } from 'react'

import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEllipsisVertical } from "react-icons/fa6";

import no_bic from '../media/images/no_pic.png'
import { AuthContext } from '../contexts/useAuth';
export default function Comments({comment,handledelete}) {

    const [showDetailComments,setShowDetailComments]=useState(false)
    const {user}=useContext(AuthContext)

    

    const toggleDetailComments=()=>{
        setShowDetailComments(prev => !prev)
    }

  return (
    <div className={'comment'}>
    <div className={'top'}> 
        <div className={'left'}>
            {comment.user_image ? 
            <img src={`${comment.user_image}`} alt="noimage" className={'user-img'} />
            :
            <img src={no_bic} alt="no-bic" className={'user-img'} />
            }
            <div className={'detail'}>
                <p className={'username'}>{comment.user}</p>
                <p className={'created'}>{comment.created}</p>
            </div>
        </div>
        <div className={'right'}>

            
            
            {user.id===comment.user_id && <FaEllipsisVertical size={'17px'} cursor={'pointer'}  onClick={toggleDetailComments}/>}
            
            {showDetailComments  && 
                    <div className={'detail'}>
                        <p className='del' onClick={()=>handledelete(comment.uid)}><MdOutlineDeleteSweep  fontSize={'18px'}/> <span>Delete</span></p>
                        <p className='edit'><CiEdit fontSize={'18px'}/><span>Update</span></p>
                    </div>
            }

        </div>
        
    </div>
    <div className={'text'}>
        <p>{comment.content}</p>
    </div>

</div>
  )
}
