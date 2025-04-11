import React, { useEffect, useState } from 'react'
import '../static/css/FormPost.css'
import { FaImage } from "react-icons/fa6";



export default function AddPostForm({onclose,addPost,currentPost,updatePost}) {
    const [content,setContent]=useState('')
    const [imagePost,setImagePost]=useState(null)
    const [previewUrl,setPreviewUrl]=useState(null)
    useEffect(()=>{
        if(currentPost){
            setContent(currentPost.content)
            if(currentPost.image){
                setPreviewUrl(`https://majdahmad1234.pythonanywhere.com/${currentPost.image}`)

            }
        }
    },[currentPost])
    const handleImagePost=(e)=>{
        const file=e.target.files[0]
        console.log('file',file)
        setImagePost(file)
        if (file){
            const url=URL.createObjectURL(file)
            setPreviewUrl(url)
        }
        else{
            setPreviewUrl(null)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("content", content);
        if (imagePost) {
            formData.append('image', imagePost); // أضف الصورة فقط إذا كانت موجودة
        }
        if(currentPost){
            await updatePost(currentPost.uid,formData)
        }
        else{
            await addPost(formData);
        }
        
        

    }
  return (
    <div className={'container_add_post'}>
    <div className={'form_add_post'} >
      <form onSubmit={handleSubmit}>
        
        <textarea name="content" id="content" value={content} onChange={(e)=>setContent(e.target.value)}  placeholder={'what is your mind ?'} required>
            
        </textarea>
        {previewUrl && <img src={previewUrl} alt="preview" />}
                 
        <div className={'buttom'}>

            <div>
                <label htmlFor="image" style={{cursor:'pointer',display:'flex',justifyContent:'center',alignItems:'center',gap:'0px 6px'}}><FaImage color={'green'} style={{marginTop:'2px'}}/><span>Image</span></label>
                <input type="file" name="image" onChange={handleImagePost} id="image" hidden/>
            </div>
            <div className={'btn'}>
                <button type={'submit'}>{currentPost ? 'Update': 'Add'}</button>
                <button onClick={onclose} type={'button'}>Cancel</button>

            </div>
        </div>
        
        
      </form>
    </div>
  </div>
  )
}
