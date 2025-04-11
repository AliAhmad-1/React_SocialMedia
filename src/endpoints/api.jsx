
import axios from "axios";



const BASE_URL='https://majdahmad1234.pythonanywhere.com/'
// const BASE_URL = 'http://127.0.0.1:8000/';

const LOGIN_URL = `${BASE_URL}api/login/`;
const REGISTER_URL= `${BASE_URL}api/register/`;
const CHANGEPASSWORD_URL=`${BASE_URL}api/change_password/`
const LOGOUT_URL=`${BASE_URL}api/logout/`

const REFRESHTOKEN_URL=`${BASE_URL}api/token/refresh/`
const IS_AUTHENTICATED_URL=`${BASE_URL}api/is_authenticated/`
const POSTS_URL=`${BASE_URL}api/posts/`
const LIKEPOST_URL=`${BASE_URL}api/post/like/`
const SAVEPOST_URL=`${BASE_URL}api/post/save/`
const ADDCOMMENT_URL=`${BASE_URL}api/post/comment/add/`
const DELETEPOST_URL=`${BASE_URL}api/post/delete/`
const DELETECOMMENT_URL=`${BASE_URL}api/post/comment/delete/`
const SAVED_POSTS_URL=`${BASE_URL}api/posts/saved/`
const FOLLOWING_USER_URL=`${BASE_URL}api/user/following/`
const FOLLOW_URL=`${BASE_URL}api/user/follow/`
const MYPROFILE_URL=`${BASE_URL}api/profileuser/`
const MYPOSTS_URL=`${BASE_URL}api/myposts/`
const POSTSUSER_URL=`${BASE_URL}api/posts/`


const SUGGESTION_URL=`${BASE_URL}api/suggestion/`

const ADD_POST_URL=`${BASE_URL}api/post/add/`
const UPDATE_POST_URL=`${BASE_URL}api/post/update/`
const GOOGLE_LOGIN_URL=`${BASE_URL}api/google/login/`


const STARTCHAT_URL=`${BASE_URL}api/start/`
const MESSAGE_UPDATE_URL=`${BASE_URL}api/message/`
const CHATS_URL=`${BASE_URL}api/chats/`


axios.defaults.withCredentials=true


export const login = async (email, password) => {
        
    
    try {
        const response = await axios.post(
            LOGIN_URL,
            { email, password },
            { withCredentials: true }
        );
        console.log('Login successful:', response.data.msg);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
            return error.response.data
        } else if (error.request) {
            console.error('No response received:', error.request);
            return { error: 'No response from server. Please try again later.' };
        } else {
            console.error('Unexpected error:', error.message);
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }
};



export const register=async(username,email,password,password_confirmation)=>{
    try{
        const response=await axios.post(REGISTER_URL,{username,email,password,password_confirmation},{withCredentials:true})
        console.log('User registred successfully')
        return response.data
    }catch(error){
        if (error.response) {
            console.error('Error response from server:', error.response.data);
            return error.response.data
        } else if (error.request) {
            console.error('No response received:', error.request);
            return { error: 'No response from server. Please try again later.' };
        } else {
            console.error('Unexpected error:', error.message);
            return { error: 'An unexpected error occurred. Please try again.' };
        }

    }

}



export const refresh_token = async () => {
    
    try {
        const response = await axios.post(REFRESHTOKEN_URL, {}, { withCredentials: true });
        return response.data.refreshed;
    } catch (error) {
        if (error.response && error.response.data.detail==='Token is blacklisted') {
            console.error('Error response from server:', error.response.data.detail);
            await logout();
            return false

        } else if (error.request && error.request.status===400) {
            
            console.log('Refresh Token not provided')
            await logout();
            window.alert('Your session has expired . Please log in again to continue.')
            window.location.pathname='/login'

            


        } else {
            console.error('Unexpected error:', error.message);
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }
};

const callRefresh = async (error, originalRequest) => {  // Pass the original request
    if (error.response && error.response.status === 401) {
      const token_refreshed = await refresh_token();

      console.log('token_refreshed',token_refreshed)
      if (token_refreshed===true) {
        try {

          const response = await axios(originalRequest); // Use the original request config
          console.log("Request after refreshed token", response.data);
          return response.data;
        } catch (retryError) {
          console.error("Error retrying request after refresh", retryError);
          return { error: 'Failed to retry request after refresh' }; // Return an error object
        }
      } else {
        return { error: 'Token refresh failed' }; // Return an error object
      }
    }
    else{

        console.log('error.response :',error.response.data.detail)
        return { error: 'Request was not a 401' }; // Return an error object
    }

  };
  
export const All_Posts = async () => {
    try {
        const response = await axios.get(POSTS_URL, { withCredentials: true });
        return response.data;
    } catch (error) {

        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
};


export const my_posts=async()=>{
    try {
        const response = await axios.get(MYPOSTS_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }

}


export const postsuser=async(user_id)=>{
    try {
        const response = await axios.get(`${POSTSUSER_URL}${user_id}/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }

}

export const suggestion=async()=>{
    try {
        const response = await axios.get(SUGGESTION_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }

}


export const like=async(post_id)=>{
    try{
        const response=await axios.post(`${LIKEPOST_URL}${post_id}/`,{},{withCredentials:true})
        return response.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 

    }
}


export const save=async(post_id)=>{
    try{
        const res=await axios.post(`${SAVEPOST_URL}${post_id}/`,{},{withCredentials:true})
        return res.data
    }catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}


export const comment=async(post_id,content)=>{
    try{
        const res=await axios.post(`${ADDCOMMENT_URL}${post_id}/`,{content},{withCredentials:true})
        return res.data
    }catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}

export const delete_post=async(post_id)=>{
try{
    const res=await axios.delete(`${DELETEPOST_URL}${post_id}/`,{},{withCredentials:true})
    return res.data
}
catch(error){
    const originalRequest = error.config;
    const refreshResult = await callRefresh(error, originalRequest);
    return refreshResult; 
    }
}

export const add_post=async(formData)=>{

    try{
        const res=await axios.post(
            ADD_POST_URL,
            formData,
            {withCredentials:true}
        )
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}
export const update_post=async(post_id,formData)=>{

    try{
        const res=await axios.put(
            `${UPDATE_POST_URL}${post_id}/`,
            formData,
            {withCredentials:true}
        )
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}

export const delete_comment=async(comment_id)=>{
    try{

        const res=await axios.delete(`${DELETECOMMENT_URL}${comment_id}/`,{},{withCredentials:true})
        return res.data
    }
    catch(error){
        if (error.response) {
            console.error('Error response from server:', error.response.data);
            return error.response.data
        } else if (error.request) {
            console.error('No response received:', error.request);
            return { error: 'No response from server. Please try again later.' };
        } else {
            console.error('Unexpected error:', error.message);
            return { error: 'An unexpected error occurred. Please try again.' };
        }
        }
    }


export const saved_posts=async()=>{
    try{
        const res=await axios.get(SAVED_POSTS_URL,{withCredentials:true})
        return res.data

    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}

export const following=async()=>{

try{
    const res=await axios.get(FOLLOWING_USER_URL,{withCredentials:true})
    return res.data
}
catch(error){
    const originalRequest = error.config;
    const refreshResult = await callRefresh(error, originalRequest);
    return refreshResult; 
}
}

export const follow_user=async(user_id)=>{
try{
    const res=await axios.post(`${FOLLOW_URL}${user_id}/`,{},{withCredentials:true})
    console.log(res.data)
    return res.data
}
catch(error){

    if (error.response) {
        console.error('Error response from server:', error.response.data);
        return error.response.data
    } else if (error.request) {
        console.error('No response received:', error.request);
        return { error: 'No response from server. Please try again later.' };
    } else {
        console.error('Unexpected error:', error.message);
        return { error: 'An unexpected error occurred. Please try again.' };
    }
}
}


export const profile=async()=>{
    try{
        const res=await axios.get(MYPROFILE_URL,{withCredentials:true}) 
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}


export const profileuser=async(user_id)=>{
    try{
        const res=await axios.get(`${MYPROFILE_URL}${user_id}/`,{withCredentials:true})
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}


export const is_authenticated=async()=>{
    try{
        const response=await axios.get(IS_AUTHENTICATED_URL,{withCredentials:true})
        return response.data
    }
    catch(error){

        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}


export const logout=async()=>{
    

    try{
        await axios.post(LOGOUT_URL,{},{withCredentials:true})
        localStorage.setItem('isLoggedIn','false')
        
        
    }catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}

export const changepassword =async(password1,password2)=>{
    try{
        const res=await axios.post(CHANGEPASSWORD_URL,{password1,password2},{withCredentials:true})
        if (res.status===200){
            return res.data
        }

    }catch(error){
        if (error.response) {
            console.error('Error response from server:', error.response.data);
            return error.response.data
        } else if (error.request) {
            console.error('No response received:', error.request);
            return { error: 'No response from server. Please try again later.' };
        } else {
            console.error('Unexpected error:', error.message);
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }

}


export const Login_with_google=async(token)=>{

try{
 const response=await axios.post(GOOGLE_LOGIN_URL,{token},{withCredentials:true})
 return response.data
}
catch(error){
    if (error.response) {
        console.error('Error response from server:', error.response.data);
        return error.response.data
    } else if (error.request) {
        console.error('No response received:', error.request);
        return { error: 'No response from server. Please try again later.' };
    } else {
        console.error('Unexpected error:', error.message);
        return { error: 'An unexpected error occurred. Please try again.' };
    }
}
}



// api endpoint for WebSocket chat

export const start_chat=async(id)=>{
    try{
        const res=await axios.post(STARTCHAT_URL,{id},{withCredentials:true})
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}

export const update_message=async(message_id,text)=>{
    try{
        const res=await axios.put(`${MESSAGE_UPDATE_URL}${message_id}/update/`,{text:text},{withCredentials:true})
        console.log('result',res.data)
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}
export const delete_message=async(message_id)=>{
    try{
        const res=await axios.delete(`${MESSAGE_UPDATE_URL}${message_id}/delete/`,{},{withCredentials:true})
        console.log('result',res.data)
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}


export const all_chats=async()=>{
    try{
        const res=await axios.get(`${CHATS_URL}`,{withCredentials:true})
        return res.data
    }
    catch(error){
        const originalRequest = error.config;
        const refreshResult = await callRefresh(error, originalRequest);
        return refreshResult; 
    }
}




