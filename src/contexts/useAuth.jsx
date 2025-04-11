import { createContext,useEffect, useState } from "react"
import { is_authenticated} from "../endpoints/api";
import { useLocation } from "react-router-dom";


export const AuthContext=createContext();
const AuthProvider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn") === "true" || false)
    const [user,setUser]=useState({})
    const [access_token,setAccess_token]=useState('')
    const location = useLocation();

    useEffect(()=>{
 
        const checkLoginStatus=async()=>{
            if (location.pathname !== "/login" && location.pathname !== "/register") {
            try{
                const res=await is_authenticated();
                if(res.is_authenticated){

                    setUser(res.user)
                    setAccess_token(res.access_token)
                    
                    setIsLoggedIn(true)
                    localStorage.setItem('isLoggedIn','true')
                }
                else{
                    setIsLoggedIn(false)
                    localStorage.setItem('isLoggedIn','false')
                }
            }
            catch(error){
                setIsLoggedIn(false)
                localStorage.setItem('isLoggedIn','false')

            }
        }
        }
        checkLoginStatus();
        
    },[location.pathname])
    
    return (
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,user,access_token}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

