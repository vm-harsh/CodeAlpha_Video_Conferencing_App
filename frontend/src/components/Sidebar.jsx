import React from 'react'
import { TiHome } from "react-icons/ti";
import { HiCalendarDateRange } from "react-icons/hi2";
import { RiLoginBoxLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";







const Sidebar = () => {
  return (
    <div className='bg-slate-800 fixed left-0 top-0 w-75 h-screen border-r-2 border-white/30 hidden lg:flex'>
        <div className='w-full h-full p-5 flex flex-col justify-between pt-22'>
            <div className='flex flex-col gap-3'>
                <button className='button w-full justify-start gap-4 bg-transparent hover:bg-primaryLight font-semibold'> <span className='text-2xl'><TiHome /></span> Home</button>
                <button className='button w-full justify-start gap-4 bg-transparent hover:bg-primaryLight font-semibold'> <span className='text-2xl'><HiCalendarDateRange /></span> Meetings</button>
                <button className='button w-full justify-start gap-4 bg-transparent hover:bg-primaryLight font-semibold'> <span className='text-2xl'><RiLoginBoxLine /></span> Join Meeting</button>
                <button className='button w-full justify-start gap-4 bg-transparent hover:bg-primaryLight font-semibold'> <span className='text-2xl'><LuUsers /></span> Contacts</button>
                <button className='button w-full justify-start gap-4 bg-transparent hover:bg-primaryLight font-semibold'> <span className='text-2xl'><CiSettings /></span> Settings</button>
            </div> 
           <div className='flex gap-4 items-center border border-white/10 rounded-lg py-2 px-3 cursor-pointer hover:bg-white/10'>
                {/* img */}
                    <div className='relative w-12 h-12 rounded-full bg-[url(/images/user.png)] bg-cover bg-center bg-no-repeat'>
                        <div className='absolute w-3 h-3 bg-green-400 bottom-0 right-1 rounded-full'></div>
                    </div>
                {/* description */}
                <div className='flex flex-col justify-center text-white'>
                    <h1 className='font-semibold'>Harsh Verma</h1>
                    <p className='text-xs text-white/70'>harsh@example.com</p>
                </div>
                <FaChevronDown className='text-white text-sm'/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar