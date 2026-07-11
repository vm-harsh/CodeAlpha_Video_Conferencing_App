import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { FcCamera, FcGoogle } from 'react-icons/fc';
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { CgScreen } from "react-icons/cg";
import { BsFillPencilFill } from "react-icons/bs";
import { FaFolder, FaGithub } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import {delay, easeIn, motion} from 'motion/react'






const SignUp = () => {

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
        confirmPassword:""
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

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`,{
            fullName:formData.fullName,
            email:formData.email,
            password:formData.password
        },{withCredentials:true})

        if(response.status === 201){
            navigate('/home');
        }

        console.log(response.data);
    }



    const containerVariant = {
      hidden:{},
      show:{
        transition:{
          staggerChildren:0.2,
          delayChildren:0.6
        }
      }
    }

    const cardVariants = {
      hidden:{opacity:0,x:-100},
      show:{
        opacity:1,
        x:0,
        transition:{
          type:"spring",
          stiffness:120,
          damping:10
        }
      }
    }



  return (
   <div className='w-full h-screen bg-slate-700 min-w-120'>
      <div className='flex items-center justify-center h-full w-full'>
        <div className='flex items-center justify-center flex-wrap w-800 h-screen lg:px-20 lg:py-20 lg:flex-col'>
        {/* left section */}
        <div className='bg-nav-bg md:w-[50%] w-full min-w-120 md:h-full md:rounded-l-lg px-15 pt-8 py-20'>
          {/* Logo */}
            <motion.div 
            initial={{opacity:0, y:-100}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.2,type:"spring",stiffness:120,damping:10}}
            className='flex items-center justify-start gap-2'>
                <FcCamera className='text-4xl'/>
                <h1 className='text-4xl font-mono text-white font-bold tracking-tight'>Meetify</h1>
            </motion.div>

            <div className='text-white mt-10 w-full md:w-100 flex flex-col items-center justify-center gap-4'>
              {/* Main Heading */}
              <motion.h4 
              initial={{opacity:0, x:-100}}
              animate={{opacity:1, x:0}}
              transition={{delay:0.4,type:"spring",stiffness:120,damping:10}}
              className='text-3xl md:text-4xl font-semibold tracking-wider'>Meet. Collaborate. Create <span className='text-purple-600'>Together.</span></motion.h4>
              
              {/* small description */}
              <motion.p
              initial={{opacity:0, x:100}}
              animate={{opacity:1, x:0}}
              transition={{delay:0.4,type:"spring",stiffness:120,damping:10}}
              className='text text-white/60'>Experience seamless video meetings, instant messaging, screen sharing, collaborative whiteboards, and secure file sharing—all in one powerful workspace.</motion.p>

              {/* cards */}
              <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="show"
              className='w-full mt-5 flex flex-col items-start gap-6'>
                {/* card 1 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                  {/* img */}
                  <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                    <BsFillCameraVideoFill className='text-lg'/>
                  </div>
                  {/* description */}
                  <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold'>HD Video Meeting</h1>
                    <p className='text-xs text-white/70'>Crystal clear audio and video calls</p>
                  </div>
                </motion.div>
                {/* card 2 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                    {/* img */}
                    <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                      <CgScreen className='text-lg'/>
                    </div>
                    {/* description */}
                    <div className='flex flex-col justify-center'>
                      <h1 className='font-semibold'>Screen Sharing</h1>
                      <p className='text-xs text-white/70'>Present your screen with a single click.</p>
                    </div>
                </motion.div>
                {/* card 3 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                    {/* img */}
                    <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                      <BsFillPencilFill  className='text-lg'/>
                    </div>
                    {/* description */}
                    <div className='flex flex-col justify-center'>
                      <h1 className='font-semibold'>Interactive Whiteboard</h1>
                      <p className='text-xs text-white/70'>Brainstorm and draw together in real time</p>
                    </div>
                </motion.div>
                {/* card 4 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                    {/* img */}
                    <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                      <FaFolder className='text-lg'/>
                    </div>
                    {/* description */}
                    <div className='flex flex-col justify-center'>
                      <h1 className='font-semibold'>Secure File Sharing</h1>
                      <p className='text-xs text-white/70'>Share documents, images, and media instantly.</p>
                    </div>
                </motion.div>
                {/* card 5 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                    {/* img */}
                    <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                      <MdLockOutline className='text-lg'/>
                    </div>
                    {/* description */}
                    <div className='flex flex-col justify-center'>
                      <h1 className='font-semibold'>End-to-End Security</h1>
                      <p className='text-xs text-white/70'>Your conversations and files stay protected.</p>
                    </div>
                </motion.div>
                {/* card 6 */}
                <motion.div variants={cardVariants} className='flex gap-4'>
                    {/* img */}
                    <div className='h-full p-3 bg-primary rounded-full shadow-purple-400 shadow-inner'>
                      <AiFillThunderbolt className='text-lg'/>
                    </div>
                    {/* description */}
                    <div className='flex flex-col justify-center'>
                      <h1 className='font-semibold'>Real-Time Messaging</h1>
                      <p className='text-xs text-white/70'>Fast, reliable chat during every meeting.</p>
                    </div>
                </motion.div>
              </motion.div>
            </div>

        </div>

        {/* right section */}
        <motion.div
        initial={{opacity:0,y:"100%"}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2,duration:2}}
        className='bg-white md:w-[50%] min-w-120 w-full md:h-full md:rounded-r-lg py-10 shadow-lg shadow-black '>
          {/* Create Accoung Heading */}
          <div className='w-full flex flex-col items-center gap-2'>
            <div className='w-full flex justify-center'>
              <div className='bg-purple-600/50 rounded-full p-3'><RiUserAddLine className='text-2xl text-white'/></div>
            </div>
            <h1 className='text-4xl font-semibold font-mono tracking-tight'>Create Your Account</h1>
            <p className='text-sm text-black/60'>Sign up to get started with Meetify</p>
          </div>

          {/* sign up form */}
          <div className='w-full flex flex-col items-center'>
            <form className='w-[50%] min-w-100 flex flex-col justify-center gap-5 mt-10' onSubmit={handleSubmit}>
              
                {/* full Name */}
                <div className='flex flex-col items-start justify-center gap-2'>
                  <label className='text-sm font-semibold'>Full Name</label>
                  <div className='flex w-full items-center border border-black/60 rounded-md max-w-200 gap-2 select-none  px-2'>
                    <div>
                        <FiUser className='text-xl text-black/60'/>
                    </div>
                    <input type='text' id='fullName' placeholder='Enter your full name' className='w-full h-full py-2 outline-none placeholder:text-black/60 placeholder:text-sm' onChange={handleChange} value={formData.fullName}/>
                  </div>
                </div>

                {/* Email Address */}
                <div className='flex flex-col items-start justify-center gap-2'>
                  <label className='text-sm font-semibold'>Email Address</label>
                  <div className='flex w-full items-center border border-black/60 rounded-md max-w-200 gap-2 select-none px-2'>
                    <div>
                        <AiOutlineMail className='text-xl text-black/60'/>
                    </div>
                    <input type='email' id='email' placeholder='Enter your email address' className='w-full h-full py-2 outline-none text-black/60 placeholder:text-black/60  placeholder:text-sm' onChange={handleChange} value={formData.email}/>
                  </div>
                </div>

                {/* Password */}
                <div className='flex flex-col items-start justify-center gap-2'>
                  <label className='text-sm font-semibold'>Password</label>
                  <div className='flex w-full items-center border border-black/60 rounded-md max-w-200 gap-2 select-none px-2'>
                    <div>
                        <MdLockOutline className='text-xl text-black/60'/>
                    </div>
                    <input type='password' id='password' placeholder='Create a password' className='w-full h-full py-2 outline-none text-black/60 placeholder:text-black/60 placeholder:text-sm' onChange={handleChange} value={formData.password}/>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className='flex flex-col items-start justify-center gap-2'>
                  <label className='text-sm font-semibold'>Password</label>
                  <div className='flex w-full items-center border border-black/60 rounded-md max-w-200 gap-2 select-none px-2'>
                    <div>
                        <MdLockOutline className='text-xl text-black/60'/>
                    </div>
                    <input type='password' id='confirmPassword' placeholder='Confirm your password' className='w-full h-full py-2 outline-none text-black/60 placeholder:text-black/60 placeholder:text-sm' onChange={handleChange} value={formData.confirmPassword}/>
                  </div>
                </div>

                {/* Submit button */}
                <div className='w-full flex justify-center'>
                  <button type='submit' className='button bg-primary w-full'> <span className='text-xl'><RiUserAddLine /></span> Create Account</button>
                </div>
            </form>
            <div className='w-[50%] min-w-100  flex flex-col gap-4'>
              <p className='w-full flex justify-center border-b'><span className='bg-white relative top-2.5 px-4 text-lg'>or</span></p>
            {/* google and github login */}
            <div className='w-full flex items-center justify-center gap-3'>
              <button className='button text-black/60 border border-black/50 select-none px-4.5 md:px-3'> <span className='text-xl'><FcGoogle /></span> Continue with google</button>
              <button className='button text-black/60 border border-black/50 select-none px-4.5'md:px-3> <span className='text-xl text-black'><FaGithub /></span> Continue with github</button>
            </div>

            {/* login option */}
            <p className='w-full flex justify-center gap-1 text-black/60 text-sm cursor-pointer' onClick={()=>navigate('/login')}>Already have an account? <span className='text-primary font-semibold'>Login</span></p>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
   </div>
  )
}

export default SignUp