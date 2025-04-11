import React, { useEffect, useState } from 'react'
import ProfileUser from '../Components/ProfileUser'
import { delete_post, postsuser, profileuser } from '../endpoints/api'
import { useParams } from 'react-router-dom'

export default function ProfileOtherUser() {

    const [profileUser,setProfileUser]=useState({})
    const [myPosts,setMyPosts]=useState([])
    
    const {user_id}=useParams()
    
    useEffect(()=>{
     
        // or this 
        // const user_id=window.location.pathname.split('/')[2]

        const handleprofile=async()=>{
            const res=await profileuser(user_id);
            setProfileUser(res)
        }
        const all_posts=async()=>{
            const data=await postsuser(user_id)
            setMyPosts(data)
        }
        all_posts();
        handleprofile();

    },[user_id])


    async function deletePost(post_id) {
        try {
            await delete_post(post_id)
            setMyPosts(myPosts.filter(post => post.uid !== post_id))

        }
        catch (err) {
            console.log('err', err)
        }
    }


  return (
    <ProfileUser myPosts={myPosts} profileUser={profileUser} deletepost={deletePost}/>
  )
}
