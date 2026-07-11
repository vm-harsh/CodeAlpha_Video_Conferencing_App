const userModel = require('../models/userModel');
const {getAuth} = require('firebase-admin/auth')
require('../firebase/firebaseAdmin')

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

const userLogOut = async (req,res) => {
    res.clearCookie("token");

    return res.status(200).json({message:"User Logout Successfully"});
}

const socialLogin = async (req,res) => {
    try {
        const {token} = req.body;

        const decodedToken = await getAuth().verifyIdToken(token);

        if(!decodedToken) return res.status(400).json({message:"Login failed"});

        const email = decodedToken.email;
        const provider = decodedToken.firebase.sign_in_provider;

        const user = await userModel.findOne({email});
        
        if(user){
            if(user.provider === "local"){
                user.provider = provider === "google.com" ? "google" : "github";
                user.firebaseUID = decodedToken.uid;

                if(!user.profilePic){
                    user.profilePic = decodedToken.picture
                }
                await user.save();
            }
            const token = user.generateAuthToken();
            res.cookie("token",token);
            return res.status(200).json(user);
        }




        const newUser = await userModel.create({
            fullName: decodedToken.name,
            email: decodedToken.email,
            profilePic: decodedToken.picture,
            provider:provider === "google.com" ? "google" : "github",
            firebaseUID: decodedToken.uid
        })

        const JWTtoken = newUser.generateAuthToken();
        res.cookie("token",JWTtoken);
        return res.status(200).json(newUser);


    } catch (error) {
        console.log(error);
        res.status(401).json({
            message:"Invalid Firebase Token"
        });
    }
}

module.exports = {userSignUp,userLogIn,userLogOut,socialLogin}