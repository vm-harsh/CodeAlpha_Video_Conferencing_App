const meetingModel = require('../models/meetingModel')


const generateMeetingId = () => {
    const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let id = '';

    for(let i = 0; i<6; i++){
        id += alphaNum[Math.floor(Math.random()*alphaNum.length)];
    }

    return id;
}


const createMeeting = async (req,res) => {
    try {
        const userId = req.user;
        const {title = "Untitled Meeting"} = req.body;

        let meetingId;
        let exists;

        do{
            meetingId = generateMeetingId();

            exists = await meetingModel.findOne({meetingId});
        }while(exists);

        const meeting = await meetingModel.create({
            host:userId,
            meetingId,
            title,
            participants: [{user:userId}]
        })

        return res.status(201).json({
            success: true,
            message: "Meeting created successfully",
            meeting
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }

}


const joinMeeting = async (req,res) => {
    try {
        const {meetingId} = req.body;
        
        if (!meetingId) {
            return res.status(400).json({
                message: "Meeting ID is required."
            });
        }
        
        const meeting = await meetingModel.findOne({meetingId}).populate("host", "fullName profilePic").populate("participants.user", "fullName profilePic");

        if(!meeting) return res.status(404).json({message:"Invalid Meeting Code"});

        if(meeting.status === "ended") return res.status(400).json({message:"Meeting has already ended"});

        const isAlreadyParticipant = meeting.participants.some(
            participant => participant.user.equals(req.user)
        );

        if(!isAlreadyParticipant){
            meeting.participants.push({user:req.user});
            if(meeting.status === 'waiting') {
                meeting.status = "active";
            }
            await meeting.save();
        }

        return res.status(200).json({success:true,message:"Meeting Joined Successfully", meeting});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
}

const findMeeting = async (req, res) => {
    try {

        const { meetingId } = req.params;

        const meeting = await meetingModel
            .findOne({ meetingId })
            .populate("host", "fullName email profilePic")
            .populate("participants.user", "fullName email profilePic");

        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Meeting found successfully",
            meeting
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

const endMeeting = async (req,res) => {
   try {
     const {meetingId} = req.params;

    const userId = req.user;

    const meeting = await meetingModel.findOne({meetingId})

    if (!meeting) {
        return res.status(404).json({
            message: "Meeting not found"
        });
    }

    if (meeting.status === "ended") {
    return res.status(400).json({
        message: "Meeting has already ended."
    });
}

    if(!meeting.host.equals(userId)){
        return res.status(403).json({message:"Only host can end meeting"});
    }

    meeting.status = "ended";

    await meeting.save();

    return res.status(200).json({
        success:true,
        message:"Meeting ended successfully",
        meeting
    })
   } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });

   }
}

const leaveMeeting = async (req,res) => {
    try{
        const {meetingId} = req.params;
        const userId = req.user;

        const meeting = await meetingModel.findOne({meetingId});

        if(!meeting){
            return res.status(404).json({
                message:"Meeting not found"
            });
        }

        meeting.participants = meeting.participants.filter(participant => !participant.user.equals(userId));

        await meeting.save();

        return res.status(200).json({
            success:true,
            message:"Left meeting successfully",
            meeting
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const meetingHistory = async (req,res) => {
    try {
        const userId = req.user;
        const meetings = await meetingModel.find({"participants.user":userId}).sort({createdAt: -1});
        if(meetings.length < 1){
            return res.status(200).json({success:true,meetings:[]})
        }

        return res.status(200).json({success:true,message:"Meetings history fetched successfully",meetings})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}
module.exports = {createMeeting,joinMeeting,findMeeting,endMeeting,leaveMeeting,meetingHistory};