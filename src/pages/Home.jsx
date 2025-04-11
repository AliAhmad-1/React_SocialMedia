
import Navbar from './../Components/Navbar';

import Posts from "../Components/Posts";
import { useState ,useEffect} from "react";
import { add_post, All_Posts, delete_post, update_post } from "../endpoints/api";
import AddPostForm from '../Components/AddPostForm';
import Loading from '../Components/Loading';
export default function Home() {

  const [posts,setPosts]=useState([])
  const [showAddPostForm,setShowAddPostForm]=useState(false)
  const [loadingPost,setLoadingPost]=useState(true)
  const [currentPost,setCurrentPost]=useState(null)
  useEffect(()=>{
    setLoadingPost(true)
    const fetchPosts=async()=>{
      const posts=await All_Posts()
      setLoadingPost(false)
      setPosts(posts)
    }
    fetchPosts();
  },[])


  const deletePost=async(post_id)=>{
    try{
        await delete_post(post_id)
        setPosts(posts.filter(post => post.uid !== post_id));

    }
    catch(err){
        console.log('err',err)
    }
  }

  const addPost=async(formData)=>{
    const data=await add_post(formData)
    setPosts([data,...posts])
    setShowAddPostForm(false)
  }
  const updatePost=async(post_id,formData)=>{
    try{
      const postupdated=await update_post(post_id,formData)
      setPosts(posts.map(post => post.uid === post_id ? postupdated : post));
      setShowAddPostForm(false)
    }
    catch(error){
      console.error("Error updating post:", error);
    }

  }
  const handleEditPostClick=(post)=>{
    setCurrentPost(post)
    setShowAddPostForm(true)
  }


  return (

    <div  className={'container-2'} >
      <div style={{position:'sticky',top:'0'}} className={'nav'} >
      <Navbar onAddPostClick={()=>setShowAddPostForm(!showAddPostForm)}/>
      {showAddPostForm && <AddPostForm addPost={addPost} updatePost={updatePost} currentPost={currentPost} onclose={()=>{setShowAddPostForm(false); setCurrentPost(null)}}/>}
      </div>
          <div  className={'home'}>
            <div className={'posts'}>

                {loadingPost ? 
                <Loading/>
                :
                <>
                  {posts.map((post)=><Posts key={post.uid} onEditPostClick={()=>handleEditPostClick(post)} deletePost={deletePost} post={post}/>)}
                </>
                }
            </div>
          </div>
    </div>

  )
}
