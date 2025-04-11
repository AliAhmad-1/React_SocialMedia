import Posts from "../Components/Posts";
import { useState ,useEffect} from "react";
import { saved_posts, delete_post } from "../endpoints/api";
import { RxHamburgerMenu } from "react-icons/rx";
import Loading from "../Components/Loading";
export default function Saved() {

  const [postssaved,setPostssaved]=useState([])
  const [postsSavedFound,setPostsSavedFound]=useState(false)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchPosts=async()=>{
      const posts=await saved_posts()
      setPostssaved(posts)
      setPostsSavedFound(true)
      setLoading(false)

    }
    fetchPosts();
  },[])


  const deletePost=async(post_id)=>{
    try{
        await delete_post(post_id)
        setPostssaved(postssaved.filter(post => post.uid !== post_id));
    }
    catch(err){
        console.log('err',err)
    }
  }


  const menu=()=>{
    const side_bar=document.getElementsByClassName('side-bar')[0]
    side_bar.classList.toggle('open')

  }


  return (

    <div className={'container-2'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem .8rem 1rem 1.8rem'}}>
          <h4>Saved posts</h4>
          <p className={'menu '} onClick={menu}><RxHamburgerMenu /></p>
          </div>
          

          <div className={'home'}>
            <div className={'posts'}>

              {loading?
              <Loading/>
              :
              postsSavedFound && postssaved.length===0 ? 
              <div className={'no-posts'}>There are no posts saved !</div>
              :
              postssaved.map((post,index)=><Posts key={post.uid} deletePost={deletePost} post={post} post_comments={post.post_comments}/>)
              }

            </div>
          </div>
    </div>

  )
}
