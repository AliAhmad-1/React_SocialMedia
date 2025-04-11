import React, { useEffect, useState } from 'react'

import ProfileUser from '../Components/ProfileUser';
import { delete_post, my_posts, profile } from '../endpoints/api';



export default function Profile() {
    


    const [profileUser,setProfileUser]=useState({})
    const [myPosts,setMyPosts]=useState([])


    useEffect(()=>{
        const handleprofile=async()=>{
            const res=await profile();
            setProfileUser(res)
        }
        const all_posts=async()=>{
            const data=await my_posts()
            setMyPosts(data)
        }
        all_posts();
        handleprofile()
    },[])


    const deletePost=async(post_id)=>{
        try{
            await delete_post(post_id)
            setMyPosts(myPosts.filter(post => post.uid !== post_id));
    
        }
        catch(err){
            console.log('err',err)
        }
      }





  return (
    <ProfileUser myPosts={myPosts} profileUser={profileUser} deletepost={deletePost}/>
  )
}
