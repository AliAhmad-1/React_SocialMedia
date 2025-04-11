import React, { useState } from 'react'
import { CgDetailsMore } from "react-icons/cg";
import { VscComment } from "react-icons/vsc";
import notsaved from '../media/images/icons8-bookmark.svg'
import savedimg from '../media/images/icons8-bookmark2.svg'
import notliked from '../media/images/icons8-heart-50.png'
import likeimg from '../media/images/icons8-heart-24.png'
import { LuSendHorizontal } from "react-icons/lu";
import Comments from './Comments';

import { comment, delete_comment,like,save } from './../endpoints/api';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import no_bic from '../media/images/no_pic.png'
import { Link } from 'react-router-dom';
import { IoIosPersonAdd } from "react-icons/io";



export default function Posts({post,deletePost,onEditPostClick}) {

    const BASE_URL='https://majdahmad1234.pythonanywhere.com'
    
    // for show all comments
    const [showComments,setShowComments]=useState(false)

    // show detail for post
    const [showDetail,setShowDetail]=useState(false)

    // for like post and increment number of liked
    const [liked,setLike]=useState(post.is_liked)
    const [likeCount,setLikeCount]=useState(post.likes_count)

    // for save post
    const [saved,setSave]=useState(post.is_save)

    // for add new comment and update comments and increment
    const [content,setContent]=useState('')
    const [comments,setComments]=useState(post.post_comments)
    const [numComments,setNumComments]=useState(post.comments_count)


    const toggleComments=()=>{
        setShowComments(!showComments)
    }

    // show detail
    const toggleDetailPost=()=>{
        setShowDetail(prev => !prev)
    }



    const handleLikePost=async(post_id)=>{    
        try{
            const res=await like(post_id)
            setLike(res.like)
            if (res.like===true){
                setLikeCount((value)=>value+1)
            }
            else{
                setLikeCount((value)=>value-1)
            }
        }
        catch(error){
            console.log(error)
            return error
        }
    }

    const handleSavePost=async(post_id)=>{    
        try{
            const res=await save(post_id)
            setSave(res.save)
            return res.save
        }
        catch(error){
            console.log(error)
            return error
        }
    }

    const addComment=async(post_id)=>{
        
        try{
            const trimmedInput=content.trim()
            if(trimmedInput.length>0){
                const res=await comment(post_id,content)
                if(res){
                    setComments([res,...comments])
                    setNumComments((value)=>value +1)
                    setContent('')
                }
            }
        }
        catch(error){
            console.log('error',error)
        }
    }


    const deletecomment=async(comment_id)=>{

            const res=await delete_comment(comment_id);

            if(res.deleted_comment){
                setNumComments((value)=>value -1)
                setComments(comments.filter((comment)=>comment_id !==comment.uid  ))
            }
   
    }

    return (
    <div className={'post'}>
        <div className={'top-section'}>
            <div className={'right'}>
                {post.user.image ?
                <img src={`${post.user.image}`} alt="no-bic" /> :
                <img src={no_bic} alt="no-bic" />}
                
                <div>
                    <p className={'username'} ><Link to={`/profileuser/${post.user.id}`}>{post.user.username}</Link></p>
                    <p className={'date'}>{post.created}</p>
                </div>
            </div>
            <div className={'left'}>

                {post.edit_info && <CgDetailsMore onClick={toggleDetailPost}  style={{cursor:'pointer'}}/>}
                {showDetail && 
                <div className={'detail'}>
                    <p className={'del'} onClick={()=>{deletePost(post.uid);setShowDetail(false)}}><MdOutlineDeleteSweep  fontSize={'18px'}/> <span>Delete</span></p>
                    <p className={'edit'} onClick={()=>{onEditPostClick();setShowDetail(false)}} ><CiEdit fontSize={'18px'}/><span>Update</span></p>
                </div>
                }

            </div>

    </div>
    <div className={'post-text'}>
        {post.content}
    </div>
    {post.image &&
    <img src={`${BASE_URL}${post.image}`} alt="no-bic" className={'image-post'}/>
}
    <div className={'interaction'}>
      <div className={'right'}>
        <div>
            <button  onClick={(post_id)=>handleLikePost(post.uid)}>
            {liked===true ?<img src={likeimg} alt={'liked'}/>:<img src={notliked} alt={'dislike'}/>}
            </button>
            <span style={{marginBottom:'4px'}}>{likeCount}</span>
        </div>
        <div style={{marginBottom:'3px'}}>
        <VscComment size={'18px'}  cursor={'pointer'} onClick={toggleComments}/>
        <span>{numComments}</span>
        </div>
      
      </div>
      <div className={'left'}>
        <button onClick={(post_id)=> handleSavePost(post.uid)}>
        {saved===true ?<img src={savedimg} alt="saved" /> :<img src={notsaved} alt="save" /> }
        </button>
       
      </div>
    </div>
    {showComments && (
    <div className={'comments-container'}>
            <form>
                <div>

                    <IoIosPersonAdd size={'30px'}/>
                    <input type="text" placeholder={'comment'}  value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <button type={'button'} onClick={()=>addComment(post.uid,content)}>
                    <LuSendHorizontal color={'white'} size={'25px'}style={{padding:'5px',backgroundColor:'black',borderWidth:".5px",borderRadius:'50%'}}/>
                </button>
            </form>
    
            <div className={'comments'} >
                {comments.map((comment,index)=> <Comments key={comment.uid} handledelete={deletecomment} comment={comment} />)}
    
            </div>
    </div>
    )

    }

  </div>
  )
}
