import React, { useEffect, useState } from 'react'
import { endMeeting, fetchMeeting, leaveMeeting } from '../api/meetingApi'
import { useNavigate, useParams } from 'react-router-dom'
import { FcVideoCall } from 'react-icons/fc'
import { FiCopy, FiVideo, FiMic, FiSettings, FiMoreVertical, FiLogOut, FiUsers, FiMessageSquare, FiShield, FiChevronUp } from 'react-icons/fi'
import { BsPeople, BsRecordCircle, BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineScreenShare } from 'react-icons/md'
import socket from '../services/socket'
import { useSelector } from 'react-redux'

const MeetingRoom = () => {

    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const { meetingId } = useParams()
    const [data, setData] = useState({})
    const [isCopied, setIsCopied] = useState(false)
    const [participants, setParticipants] = useState([])
    const [message, setMessage] = useState('')
    const isHost = data?.host?._id === user._id;
    const participantsCount = data?.participants?.length || 0


    
    useEffect(()=>{
        const getCurrentMeeting = async () => {
            try {
                const meetingData = await fetchMeeting(meetingId)
                setData(meetingData.meeting)
                socket.emit('join-room', {meetingId, user});
            } catch (error) {
                console.log(error)
            }
        }
        getCurrentMeeting()

        

        const handleMeetingEnded = () => {
            alert("Meeting has been ended by the host");
            navigate('/home');
        }

        socket.on("message",(msg)=>{
            setMessage(msg);
            setTimeout(()=>setMessage(''),3000)
        })

        socket.on("meeting-ended", handleMeetingEnded);

        socket.on("participants-updated", ({participants}) => {
            setParticipants(participants);
        });

        return () => {
            socket.off("message",(msg)=>{
                setMessage(msg);
                setTimeout(()=>setMessage(''),3000)
            });
            socket.off("meeting-ended", handleMeetingEnded);
            socket.off("participants-updated", (updatedParticipants) => {
                setParticipants(updatedParticipants);
            });
        }

    },[meetingId])


    const roomParticipants = participantsCount > 0 ? participants.map((participant,index)=>{
        const initials = participant.user.fullName.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 2);
        return {
            id: index,
            name: participant.user.fullName,
            initials,
            accent: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
            host: participant.user._id === data?.host?._id,
            muted: true
        }
    }): [];

    const chatMessages = [
        { id: 1, author: 'Aman Mishra', time: '10:30 AM', text: 'Hello everyone 👋', mine: false, accent: '#6bbf59' },
        { id: 2, author: 'Harsh Verma', time: '10:31 AM', text: 'Hey Aman, good morning!', mine: true, accent: '#7c7cff' },
        { id: 3, author: 'Rahul Kumar', time: '10:31 AM', text: 'Good morning everyone 😊', mine: false, accent: '#f3b84b' },
    ]

    const handleCopyMeetingId = async () => {
        try {
            await navigator.clipboard.writeText(data?.meetingId || meetingId)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1800)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEndMeeting = async () => {
        try{
            const data = await endMeeting(meetingId);
            socket.emit("end-meeting",{meetingId});
            navigate('/home');
        }catch(error){
            console.log(error?.response?.data?.message)
        }
    }

    const handleLeaveMeeting = async () => {
        try {
            const data = await leaveMeeting(meetingId);
            socket.emit("leave-room",{meetingId,userName:user.fullName});
            
            navigate('/home');
        } catch (error) {
            console.log(error?.response?.data?.message)
        }   
    }

    return (
        <div className='min-h-screen bg-[#060b14] p-3 text-white sm:p-4'>
            <div className='mx-auto  flex min-h-[calc(100vh-1.5rem)] max-w-350 flex-col overflow-hidden rounded-4xl border border-white/8 bg-[#0b1018] shadow-[0_30px_90px_rgba(0,0,0,0.6)]'>
                <div className='flex flex-col gap-3 border-b border-white/8 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-5'>
                    <div className='flex items-center gap-3'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8'>
                            <FcVideoCall className='text-3xl' />
                        </div>

                        <div className='min-w-0'>
                            <div className='flex flex-wrap items-center gap-2'>
                                <h1 className='truncate text-lg font-semibold sm:text-xl'>{data?.title || 'Project Discussion'}</h1>
                                <FiMoreVertical className='text-white/40' />
                            </div>

                            <div className='mt-1 flex flex-wrap items-center gap-2 text-sm text-white/55'>
                                <span className='inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-white/80'>
                                    <span className='text-primaryLight'>#</span>
                                    <span className='font-mono'>{data?.meetingId || meetingId}</span>
                                    <button onClick={handleCopyMeetingId} className='text-white/45 transition hover:text-white'>
                                        <FiCopy className='text-sm' />
                                    </button>
                                </span>
                                <span className='inline-flex items-center gap-2'>
                                    <BsRecordCircle className='text-emerald-400' />
                                    {participantsCount} participants
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 lg:gap-3'>
                        <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-white/75 transition hover:bg-white/10'>
                            <FiShield className='text-lg' />
                        </button>
                        <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-white/75 transition hover:bg-white/10'>
                            <FiUsers className='text-lg' />
                        </button>
                        <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-white/75 transition hover:bg-white/10'>
                            <FiMessageSquare className='text-lg' />
                        </button>
                        <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-white/75 transition hover:bg-white/10'>
                            <FiSettings className='text-lg' />
                        </button>
                        <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/6 text-white/75 transition hover:bg-white/10'>
                            <BsThreeDotsVertical className='text-lg' />
                        </button>
                        {
                            isHost ? (
                                <button onClick={handleEndMeeting} className='ml-1 inline-flex h-11 items-center gap-2 rounded-2xl bg-[#d34b48] px-4 text-sm font-medium text-white transition hover:brightness-110'>
                                    <FiLogOut />
                                    End Meeting
                                </button>
                            ) : (
                                <button onClick={handleLeaveMeeting} className='ml-1 inline-flex h-11 items-center gap-2 rounded-2xl bg-[#d34b48] px-4 text-sm font-medium text-white transition hover:brightness-110'>
                                    <FiLogOut />
                                    Leave Meeting
                                </button>
                            )
                        }
                    </div>
                </div>


                <div className='grid flex-1 gap-3 p-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]'>
                    <section className='flex min-h-0 flex-col gap-3'>
                        <div className='relative flex min-h-105 flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#11151c]'>
                            <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,124,255,0.11),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,124,255,0.08),transparent_22%)]' />
                            <div className='relative flex items-start justify-between px-4 py-4 sm:px-5'>
                                <div className='flex items-center gap-2 text-sm text-white/55'>
                                    <span className='rounded-full border border-white/8 bg-black/20 px-3 py-1.5'>
                                        <FiShield className='inline -translate-y-px mr-1' />
                                        Secure room
                                    </span>
                                    <span className='rounded-full border border-white/8 bg-black/20 px-3 py-1.5'>
                                        <BsRecordCircle className='inline -translate-y-px text-emerald-400 mr-1' />
                                        Live
                                    </span>
                                </div>

                                <button className='rounded-2xl border border-white/8 bg-black/20 p-3 text-white/60 transition hover:bg-white/10'>
                                    <FiMoreVertical />
                                </button>
                            </div>

                            <div className='relative flex flex-1 flex-col items-center justify-center px-6 py-8 text-center'>
                                <div className='flex h-28 w-28 items-center justify-center rounded-full bg-[#6b63ff] text-4xl font-semibold text-white shadow-[0_0_0_12px_rgba(107,99,255,0.08)] sm:h-32 sm:w-32 sm:text-5xl'>
                                    {String(data?.title || 'HV')
                                        .split(' ')
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map((word) => word[0])
                                        .join('')
                                        .toUpperCase()}
                                </div>

                                <h2 className='mt-6 text-2xl font-semibold sm:text-3xl'>{data?.host?.fullName || 'Harsh Verma'}</h2>
                                <span className='mt-2 rounded-full bg-white/6 px-3 py-1 text-sm text-white/65'>Host</span>

                                <p className='mt-8 max-w-md text-base text-white/60'>
                                    You are the only one in the meeting
                                </p>
                                <p className='mt-1 max-w-lg text-sm text-white/40'>
                                    Share this meeting link with others to invite them
                                </p>

                                <div className='mt-6 flex w-full max-w-xl items-stretch overflow-hidden rounded-2xl border border-white/8 bg-black/20'>
                                    <div className='flex flex-1 items-center gap-3 px-4 py-3 text-left text-sm text-white/60'>
                                        <FiCopy className='shrink-0 text-white/45' />
                                        <span className='truncate'>https://meetify.com/meeting/{data?.meetingId || meetingId}</span>
                                    </div>
                                    <button
                                        onClick={handleCopyMeetingId}
                                        className='m-2 rounded-xl bg-[#6b63ff] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110'
                                    >
                                        {isCopied ? 'Copied' : 'Copy Link'}
                                    </button>
                                </div>

                                <div className='mt-8 flex w-full max-w-xl items-center gap-4'>
                                    <div className='h-px flex-1 bg-white/10' />
                                    <span className='text-sm text-white/35'>or</span>
                                    <div className='h-px flex-1 bg-white/10' />
                                </div>

                                <button className='mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-medium text-[#b0a9ff] transition hover:bg-white/10'>
                                    <FiUsers />
                                    Invite Participants
                                </button>
                            </div>
                        </div>

                        <div className='rounded-[1.75rem] border border-white/8 bg-[#11151c] px-4 py-3'>
                            <div className='flex items-center justify-between gap-3'>
                                <button className='flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-[#ff5757]' onClick={handleEndMeeting}>
                                        <FiMic />
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>Mic</span>
                                </button>

                                <button className='flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-white/65'>
                                        <FiVideo />
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>Camera</span>
                                </button>

                                <button className='flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-white/65'>
                                        <MdOutlineScreenShare />
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>Screen</span>
                                </button>

                                <button className='flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-white/65'>
                                        <FiMessageSquare />
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>Chat</span>
                                </button>

                                <button className='relative flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-white/65'>
                                        <FiUsers />
                                        <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6b63ff] text-[10px] font-semibold text-white'>
                                            {participantsCount || 3}
                                        </span>
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>Participants</span>
                                </button>

                                <button className='flex flex-col items-center gap-2 rounded-2xl px-4 py-2 text-white/70 transition hover:bg-white/6 hover:text-white'>
                                    <span className='flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-lg text-white/65'>
                                        <FiMoreVertical />
                                    </span>
                                    <span className='text-[11px] uppercase tracking-[0.24em]'>More</span>
                                </button>

                                <button className='relative flex h-14 w-14 items-center justify-center rounded-full bg-[#d34b48] text-2xl text-white shadow-[0_10px_30px_rgba(211,75,72,0.35)] transition hover:brightness-110'>
                                    <FiLogOut className='rotate-180' />
                                </button>
                            </div>
                        </div>
                    </section>

                    <aside className='flex min-h-0 flex-col gap-3'>
                        <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#11151c]'>
                            <div className='flex items-center justify-between border-b border-white/8 px-4 py-4'>
                                <div className='flex items-center gap-2 text-sm font-medium text-white/85'>
                                    <FiUsers />
                                    <span>Participants ({participantsCount || roomParticipants.length})</span>
                                </div>
                                <FiChevronUp className='text-white/45' />
                            </div>

                            <div className='space-y-4 px-4 py-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent h-80'>
                                {roomParticipants.map((participant) => (
                                    <div key={participant.id} className='flex items-center justify-between gap-3 '>
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white'
                                                style={{ backgroundColor: participant.accent }}
                                            >
                                                {participant.initials}
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2'>
                                                    <p className='text-sm font-medium text-white/90'>{participant.name}</p>
                                                    {participant.host && <span className='rounded-md bg-[#6b63ff]/25 px-2 py-0.5 text-[11px] text-[#b7b2ff]'>Host</span>}
                                                </div>
                                                <p className='text-xs text-white/45'>{participant.host ? 'You are hosting' : 'In the meeting'}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-2 text-white/55'>
                                            <FiMic className={participant.muted ? 'text-[#d34b48]' : 'text-emerald-400'} />
                                            <BsThreeDotsVertical className='text-xs' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex min-h-0 flex-[1.25] flex-col overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#11151c]'>
                            <div className='flex items-center justify-between border-b border-white/8 px-4 py-4'>
                                <div className='flex items-center gap-2 text-sm font-medium text-white/85'>
                                    <FiMessageSquare />
                                    <span>Chat</span>
                                </div>
                                <FiChevronUp className='text-white/45' />
                            </div>

                            <div className='flex-1 space-y-4 overflow-y-auto px-4 py-4'>
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={message.mine ? 'flex justify-end' : 'flex justify-start'}>
                                        <div className={message.mine ? 'max-w-[85%] text-right' : 'max-w-[85%]'}>
                                            <div className={message.mine ? 'mb-1 text-right text-xs text-white/45' : 'mb-1 text-xs text-white/45'}>
                                                <span className='font-medium text-white/75'>{message.author}</span> <span>{message.time}</span>
                                            </div>
                                            <div
                                                className={message.mine
                                                    ? 'rounded-2xl rounded-tr-md bg-[#6b63ff] px-4 py-3 text-sm text-white shadow-[0_8px_25px_rgba(107,99,255,0.22)]'
                                                    : 'rounded-2xl rounded-tl-md bg-white/8 px-4 py-3 text-sm text-white/80'}
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='border-t border-white/8 p-4'>
                                <div className='flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3'>
                                    <input
                                        type='text'
                                        placeholder='Type a message...'
                                        className='w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30'
                                    />
                                    <button className='rounded-xl bg-[#6b63ff] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110' >
                                        <FiMessageSquare />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <div>
                {message && (
                    <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#6b63ff] text-white px-4 py-2 rounded-lg shadow-lg'>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )

}

export default MeetingRoom