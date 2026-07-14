const mongoose = require('mongoose')


const meetingSchema = new mongoose.Schema({
    host:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    meetingId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"Untitled Meeting"
    },
    participants:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        joinedAt:{
            type:Date,
            default:Date.now
        }
    }],
    status:{
        type:String,
        enum:['waiting','active','ended'],
        default:"waiting"
    }
},{timestamps:true});

const meetingModel = mongoose.model('Meeting',meetingSchema);

module.exports = meetingModel