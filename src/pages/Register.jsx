import { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { register } from '../endpoints/api';

export default function Register() {

    const [loading,setLodaing]=useState(false);
    const nav=useNavigate()

    const [errorMessage, setErrorMessage] = useState({username:"",email:"",password:""});
    const [formData,setFormData]=useState({username:"",email:"",password:"",password_confirmation:""})


    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        setErrorMessage({...errorMessage,[e.target.name]:""})
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setLodaing(true);

        const response = await register(formData.username,formData.email,formData.password,formData.password_confirmation);

        if (response.email ||response.password ) {
            setLodaing(false)
            setErrorMessage(response)
        }
        else {
            setLodaing(false)
            nav('/login')   
        }
    };
   

    return (
        <div className="register_container">
            <div className="register">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                <div>
                        <label htmlFor="username">UserName:</label>
                        <input
                            type="text"
                            id="username"
                            name={'username'}
                            placeholder="Enter your username..."
                            value={formData.username}
                            onChange={handleChange}
                            required
                            
                        />
                        {errorMessage.username && <span style={{ color: 'red',fontSize:'14px' }}>{errorMessage.username[0]}</span>}

                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name={'email'}
                            placeholder="Enter your email..."
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage.email && <span style={{ color: 'red',fontSize:'14px' }}>{errorMessage.email[0]}</span>}

                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name={'password'}
                            placeholder="Enter your password..."
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errorMessage.password && <span style={{ color: 'red',fontSize:'14px' }}>{errorMessage.password} </span>}

                    </div>
                    <div>
                        <label htmlFor="password">Password Confirmation:</label>
                        <input
                            type="password"
                            id="password"
                            name={'password_confirmation'}
                            placeholder="Enter your password confirmation..."
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button type="submit">{loading ?<>Loading ...</>:<>Register</>}</button>
                </form>

            </div>
        </div>
    );
}
