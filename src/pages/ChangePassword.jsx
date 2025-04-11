import React, { useState } from 'react'
import { changepassword } from '../endpoints/api'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')
    const [error,setError]=useState({})
    const [loade,setLoading]=useState(false)
    const nav=useNavigate()

    const handle_changepassword=async(event)=>{
        event.preventDefault()
        setError({})
        setLoading(true)
        const res=await changepassword(password,password2)
        if (res.msg==='password was updated successfully '){
            console.log(res.msg)
            setLoading(false)
            nav('/')
        }
        else{
            setLoading(false)
            setError(res)
        }



    }
    return (
        <div className="changepassword_container">
            <div className="change_password">
                <h2>Change Password</h2>
                <form onSubmit={handle_changepassword}>

                    <div>
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder="password..."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password Confirmation:</label>
                        <input
                            type="password"
                            id="password"
                            value={password2}
                            onChange={(e)=>{setPassword2(e.target.value)}}
                            placeholder="password again..."
                            required
                        />
                    </div>
                    {error.password && <span style={{ color: 'red',fontSize:'14px' }}>{error.password[0]}</span>}

                    <button type="submit">{loade ? 'Loading ...': 'Change Password'}</button>
                </form>

            </div>
        </div>
    );
}
