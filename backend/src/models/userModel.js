const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullName:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        select:false
    },
    profilePic: {
        type:String,
        default:""
    },
    about:{
        type:String,
        default:"Hey there! I am using VermaJI app"
    },
    socketId:{
        type:String,
        default:null
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["online","offline"],
        default:"offline"
    },
    lastSeen:{
        type:Date,
        default:Date.now()
    },
    contacts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});



userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10);
}


userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}


const userModel = mongoose.model("User",userSchema);



module.exports = userModel;