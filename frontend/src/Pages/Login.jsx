import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email:"",
        password:"",
        rememberMe:false
    })

    const handleChange = (e) => {
        const {id,value} = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [id]:value
            }
        })
    }


    const handleSubmit = async () => {
        event.preventDefault();       
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`,formData,{withCredentials:true});
            if(response.status === 200){
                navigate('/home');
            }
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div>
      Hello
    </div>
  )
}

export default Login