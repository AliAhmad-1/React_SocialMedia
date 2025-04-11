import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {login, Login_with_google } from '../endpoints/api';
import { AuthContext } from '../contexts/useAuth';

import {useGoogleLogin } from '@react-oauth/google';

import google from'../media/images/google.png'




export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading,setLodaing]=useState(false);
    const {setIsLoggedIn}=useContext(AuthContext)
    const nav=useNavigate()

    const handleLogin = async (event) => {
        
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setLodaing(true);
    
        const response = await login(email, password);
        
        if (response.error) {
            setIsLoggedIn(false)
            setLodaing(false)
            setErrorMessage(response.error)            
        } else {
            setIsLoggedIn(true)
            localStorage.setItem('isLoggedIn','true')

            setLodaing(false)
            setSuccessMessage('Login successful!');
            nav('/')
            
        }


    };




    const handleGoogleLogin=async(access_token)=>{

        const res=await Login_with_google(access_token)
        if(res.message==='Login successful'){
            setIsLoggedIn(true)
            localStorage.setItem('isLoggedIn','true')
            nav('/')
        }
        else{
            setIsLoggedIn(false)
        }
        

    }
    const googlelogin = useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
    });
   

    return (
        <div className="login-container">
            <div className="login">

                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && <span style={{ color: 'red',fontSize:'14px' }}>{errorMessage}</span>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <button type="submit">{loading ?<>Loading ...</>:<>Login</>}</button>
                    <span className={'register-link'}>Don't have an account? <NavLink to={'/register'}>Sign up</NavLink>
                    </span>
                </form>
                <div className={'social'}>
                <hr />  <span>OR</span> <hr />
                </div>
                               

                <button onClick={() => googlelogin()} className={'google_btn'}>
                    <img src={google} alt="google_icon" />
                    <span>Sign in with Google</span>
                </button>




                
  


            </div>
        </div>
    );
}