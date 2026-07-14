import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { LuUsers } from "react-icons/lu";
import { IoMdAdd } from 'react-icons/io'
import { FaArrowRight, FaDesktop } from "react-icons/fa";
import CreateMeetingComponent from '../components/CreateMeetingComponent'
import { joinMeeting } from '../api/meetingApi'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth)
  const [isCreateMeetingPanelOpen, setIsCreateMeetingPanelOpen] = useState(false);
  const [meetingId, setMeetingId] = useState("");

  const handleJoinMeeting = async () => {
    try {
      if(meetingId.trim().length !== 6){
        console.log("Meeting Id must be 6 char long");
        return;
      }
      console.log(meetingId)
      const data = await joinMeeting(meetingId);

      console.log(data);

      navigate(`/meeting/${data.meeting.meetingId}`);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-slate-800 w-full h-screen min-w-120'>
      <Navbar setIsCreateMeetingPanelOpen={setIsCreateMeetingPanelOpen}/>
      <Sidebar/>
      {isCreateMeetingPanelOpen && <CreateMeetingComponent setIsCreateMeetingPanelOpen={setIsCreateMeetingPanelOpen}/>}
      <div className='lg:pl-90 pl-10 py-10 pr-10 flex flex-col gap-5 w-full'> 
        {/* Welcome back Message */}
        <div className='text-white flex flex-col gap-2'>
          <h1 className='text-4xl font-bold'>Welcome Back, <span className='capitalize'>{user.fullName}!</span>👋</h1>
          <h4 className='text-lg text-white/60'>Ready to connect and collaborate?</h4>
        </div>

        {/* Meeting create and join buttons */}
        <div className='flex gap-4 justify-center items-center flex-wrap'>
          {/* Create meeting button */}
          <div className='flex flex-col text-white px-6 rounded-2xl bg-primaryLight py-8 gap-10 border-white/20 border-2 min-w-80 grow'>
            <div className='flex gap-6'>
              <div className=' bg-primary p-5 rounded-lg'>
              <BsFillCameraVideoFill className='text-3xl'/>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <h1 className='text-xl font-semibold'>New Meeting</h1>
              <h4 >Start an instant meeting</h4>
            </div>
            </div>
            <button className='button bg-white text-primary font-semibold w-[80%] self-center' onClick={()=>setIsCreateMeetingPanelOpen(true)}> <span className='text-xl'><IoMdAdd /></span> Create Meeting</button>
          </div>

          {/* Join a meeting button */}
          <div className='flex flex-col text-white px-6 rounded-2xl bg-blue-950 py-8 gap-10 border-white/20 border-2 min-w-80 grow'>
            <div className='flex gap-6'>
              <div className=' bg-blue-900 p-5 rounded-lg'>
              <LuUsers className='text-3xl'/>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <h1 className='text-xl font-semibold'>Join a Meeting</h1>
              <h4 >Join with a meeting code</h4>
            </div>
            </div>
            <div className='flex gap-2'>
              <input type='text' placeholder='Enter meeting code' className='w-full border border-white/20 outline-none rounded pl-4 bg-nav-bg placeholder:text-white/70' value={meetingId} onChange={(e)=>setMeetingId(e.target.value)}/>
              <button className='button bg-primary font-semibold py-3' onClick={handleJoinMeeting}> <FaArrowRight/></button>
            </div>
          </div>

          {/* Share Screen */}
          <div className='flex flex-col text-white px-6 rounded-2xl bg-green-950/80 py-8 gap-10 border-white/20 border-2 min-w-80 grow  '>
            <div className='flex gap-6'>
              <div className=' bg-green-900 p-5 rounded-lg'>
              <FaDesktop className='text-3xl'/>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <h1 className='text-xl font-semibold'>Share Screen</h1>
              <h4 >Share your screen instantly</h4>
            </div>
            </div>
            <button className='button bg-white text-black font-semibold w-[80%] self-center'> <span className='text-xl'><FaDesktop /></span> Share Screen</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home