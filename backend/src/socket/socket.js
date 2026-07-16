const {Server} = require('socket.io');
const meetingModel = require('../models/meetingModel');


const getMeeting = async (meetingId) => {
    const meeting = await meetingModel.findOne({meetingId}).populate('participants.user', 'fullName email');
    if(!meeting){
        throw new Error("Meeting not found");
    }
    return meeting;
}

const initializeSocket =  (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('join-room', async ({meetingId, user}) => {
            socket.join(meetingId);
            const meeting = await getMeeting(meetingId);
            io.to(meetingId).emit("participants-updated", { participants: meeting.participants });
            console.log(`User with ID ${user._id} joined room ${meetingId}`);
            io.to(meetingId).emit("message",`${user.fullName} joined the meeting`);
            
        })

        socket.on("leave-room",async ({userName,meetingId})=>{
            console.log(`${userName} leaves the meeting`);
            socket.leave(meetingId);
            
            const meeting =await getMeeting(meetingId);

            io.to(meetingId).emit("participants-updated", { participants: meeting.participants });
            io.to(meetingId).emit("message", `${userName} left the meeting`);
        })

        socket.on("end-meeting",({meetingId})=>{
            socket.to(meetingId).emit("message", "Meeting has been ended by the host");
            socket.to(meetingId).emit("meeting-ended");
            socket.leave(meetingId);
        })
    })  
}

module.exports = initializeSocket;