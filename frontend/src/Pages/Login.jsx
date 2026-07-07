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
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,formData,{withCredentials:true});
            if(response.status === 200){
                navigate('/home');
            }
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-hero">
          <div className="auth-badge">Video calling + chat</div>
          <h1>Stay connected in one clean workspace.</h1>
          <p>
            Jump into secure video calls, manage conversations, and keep your team in sync from
            phone or laptop.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-dot" />
              HD calls with smooth performance
            </div>
            <div className="feature-item">
              <span className="feature-dot" />
              Real-time chat alongside every meeting
            </div>
            <div className="feature-item">
              <span className="feature-dot" />
              Responsive layout for small and large screens
            </div>
          </div>
        </aside>

        <section className="auth-card">
          <div className="auth-card-header">
            <div>
              <p className="auth-kicker">Welcome back</p>
              <h2>Log in to your account</h2>
            </div>
            <p className="auth-subtitle">Use your email and password to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="email">Email address</label>
            <input id="email" className="field-input" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}/>

            <label className="field-label" htmlFor="password">Password</label>
            <input id="password" className="field-input" type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>

            <div className="auth-row">
              <label className="checkbox-wrap">
                <input type="checkbox" onChange={() => setFormData((formData)=>({...formData, rememberMe:!formData.rememberMe}))}/>
                <span>Remember me</span>
              </label>
              <a className="text-link" href="/login">Forgot password?</a>
            </div>

            <button className="primary-btn" type="submit">Log in</button>

            <div className="divider">
              <span />
              <p>or</p>
              <span />
            </div>

            <button className="secondary-btn" type="button">Continue with Google</button>

            <p className="switch-text">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </section>
      </section>
    </main>
  )
}

export default Login