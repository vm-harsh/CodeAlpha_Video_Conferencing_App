const userModel = require('../models/userModel');

const userSignUp = async (req,res) => {
    const {fullName,email,password} = req.body;
    
    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
        return res.status(404).json({message:"User Already Exist with this Email"});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        fullName, email, password:hashPassword
    })


    const token = user.generateAuthToken();
    res.cookie("token",token);


    return res.status(201).json({user,token});
}


const userLogIn = async (req,res) => {
    const {email,password,rememberMe} = req.body;
    
    const user = await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({message:"username or password Incorrect"});
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return res.status(404).json({message:"username or password Incorrect"});
    }

    const token = user.generateAuthToken();

    const cookieOptions = {
        samesite:"lax",
        httpOnly:true
    }


    if(rememberMe) cookieOptions.maxAge = 30*24*60*60*1000;
        
    res.cookie("token",token,cookieOptions);

    return res.status(200).json({user,token});
}

module.exports = {userSignUp,userLogIn}