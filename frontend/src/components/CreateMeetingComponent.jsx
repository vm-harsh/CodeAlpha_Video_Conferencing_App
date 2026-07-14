import React, { useState } from 'react'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { IoMdClose } from "react-icons/io";
import { createMeeting } from '../api/meetingApi';
import { useNavigate } from "react-router-dom";

const CreateMeetingComponent = ({setIsCreateMeetingPanelOpen}) => {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");

    const handleCreateMeeting = async () => {
        try {
            const data = await createMeeting(title);
            console.log(data);
            navigate(`/meeting/${data.meeting.meetingId}`)
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='absolute inset-0 w-full h-screen flex justify-center items-center bg-black/70 px-4 min-w-120 z-40'>
        <div className='relative flex flex-col justify-ceter items-start gap-4 text-white w-110 bg-slate-700 p-6 rounded-2xl mx-auto'>
            <div className='w-full flex justify-between items-center'>
                <div className='flex gap-6 items-center'>
                    <div className='flex gap-6 items-center'>
                        <div className='p-3 rounded-xl bg-primary'>
                        <BsFillCameraVideoFill className='text-2xl'/>
                        </div>
                        <h1 className='text-2xl font-semibold'>Create New Meeting</h1>
                    </div>
                </div>
                <IoMdClose className='text-3xl cursor-pointer' onClick={()=>setIsCreateMeetingPanelOpen(false)}/>
            </div>

            <div className='flex flex-col gap-3 w-full'> 
                <h4 className='text-lg text-white/60'>Meeting Title (Optional)</h4>
                <input type='text' className='border-2 border-white/60 rounded py-2 outline-none focus:border-primary px-3 ' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <h4 className='text-sm text-white/60'>If left empty, the meeting will be created as "Untitled Meeting"</h4>
            </div>

            <div className='flex w-full justify-end gap-4'>
                <button className='button border select-none px-4.5 md:px-3' onClick={()=>setIsCreateMeetingPanelOpen(false)}>Cancel</button>
                <button className='button bg-primary select-none px-4.5 md:px-3' onClick={handleCreateMeeting}>Create Meeting</button>
            </div>
        </div>
    </div>
  )
}

export default CreateMeetingComponent