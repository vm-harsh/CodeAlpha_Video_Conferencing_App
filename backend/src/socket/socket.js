const {Server} = require('socket.io');

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        socket.on('join-room', ({meetingId, user}) => {
            socket.join(meetingId);
            console.log(`User with ID ${user._id} joined room ${meetingId}`);
            io.emit("message",`${user.fullName} joined the meeting`);
            
        })

        socket.on("leave-room",({userName,meetingId})=>{
            console.log(`${userName} leaves the meeting`);
            socket.leave(meetingId);
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