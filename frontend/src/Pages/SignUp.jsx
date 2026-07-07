import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        fullName:"Harsh Verma",
        email:"harsh12@gmail.com",
        password:"123456",
        confirmPassword:"123456"
    });

    const handleChange =  (e) => {
        const {id,value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [id]:value
        }))
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(formData.password != formData.confirmPassword){
            console.log("password not match");
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`,{
            fullName:formData.fullName,
            email:formData.email,
            password:formData.password
        },{withCredentials:true})

        if(response.status === 201){
            navigate('/home');
        }

        console.log(response.data);
    }


  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell-reverse">
        <section className="auth-card">
          <div className="auth-card-header">
            <div>
              <p className="auth-kicker">Create account</p>
              <h2>Start your workspace today</h2>
            </div>
            <p className="auth-subtitle">Set up your profile in under a minute.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="name">Full name</label>
            <input id="fullName" className="field-input" type="text" placeholder="Your name" value={formData.fullName} onChange={handleChange}/>

            <label className="field-label" htmlFor="signup-email">Email address</label>
            <input id="email" className="field-input" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />

            <label className="field-label" htmlFor="signup-password">Password</label>
            <input id="password" className="field-input" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange}/>

            <label className="field-label" htmlFor="confirm-password">Confirm password</label>
            <input id="confirmPassword" className="field-input" type="password" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange}/>

            <label className="checkbox-wrap terms-wrap">
              <input type="checkbox" />
              <span>I agree to the terms and privacy policy</span>
            </label>

            <button className="primary-btn" type="submit">Create account</button>

            <div className="divider">
              <span />
              <p>or</p>
              <span />
            </div>

            <button className="secondary-btn" type="button">Sign up with Google</button>

            <p className="switch-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </section>

        <aside className="auth-hero auth-hero-accent">
          <div className="auth-badge">Built for conversations</div>
          <h1>Everything your team needs to meet, message, and move faster.</h1>
          <p>
            Keep calls, chats, and collaboration close together with a layout that feels natural
            on mobile and desktop.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <strong>Instant</strong>
              <span>Sign in and start a call quickly</span>
            </div>
            <div className="stat-card">
              <strong>Secure</strong>
              <span>Protect your sessions and messages</span>
            </div>
            <div className="stat-card">
              <strong>Adaptive</strong>
              <span>Looks balanced on phones and laptops</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default SignUp