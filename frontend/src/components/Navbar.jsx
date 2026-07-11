import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FcCamera } from "react-icons/fc";
// import user from "../assets/images/user.png"


const Navbar = () => {
  return (
    <div className='w-full py-4 bg-nav-bg'>
        <div className='w-full h-full flex justify-between items-center px-5'>
            {/* Logo */}
            <div className='flex items-center justify-center gap-2'>
                <FcCamera className='text-4xl'/>
                <h1 className='text-4xl font-mono text-white font-bold tracking-tight'>Meetify</h1>
            </div>

            {/* Search bar */}
            <div className='flex items-center border-2 border-slate-600 rounded-md max-w-200 w-[30%] gap-2 select-none  bg-slate-700 px-2'>
                <div>
                    <CiSearch className='text-xl text-white'/>
                </div>
                <input type='text' placeholder='Search users' className='w-full h-full py-2 outline-none text-white placeholder:text-white/40'/>
            </div>

            {/* Meeting button and profile button */}
            <div className='flex items-center justify-center gap-8'>
                {/* button */}
                <button className='button bg-primary'> <span className='text-xl'><IoMdAdd /></span> Create Meeting</button>
                {/* notification icon */}
                <div className='relative cursor-pointer'>
                    <IoMdNotificationsOutline className='text-3xl text-white' />
                    <div className='absolute bg-red-500 rounded-full w-4 h-4 -top-1 right-0 flex justify-center items-center text-white text-xs'>5</div>
                </div>
                {/* profile button */}
                <div className=' relative w-12 h-12 rounded-full bg-[url(/images/user.png)] bg-cover bg-center bg-no-repeat cursor-pointer'>
                    <div className='absolute w-3 h-3 bg-green-400 bottom-0 right-1 rounded-full'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar