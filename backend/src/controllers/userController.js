const uploadToCloudinary = require('../FileUpload/Cloudinary');
const userModel = require('../models/userModel')

const fetchAllUsers = async (req,res) => {
    const users = await userModel.find({_id:{$ne:req.user}});

    return res.status(200).json(users);
}

const fetchUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
};

const updateName = async (req,res) => {
    const {name} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(req.user,{fullName:name},{returnDocument:'after'});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
}


const updateAbout = async (req,res) => {
    const {about} = req.body
    try {
        const user = await userModel.findByIdAndUpdate(req.user,{about:about},{returnDocument:'after'});
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
}

const profilePicUpload = async (req,res) => {
   try {
        const file = req.file;

        if(!file){
            return res.status(400).json({message:"No file upload"})
        }

        const imageURL = await uploadToCloudinary(file.path);

        if(!imageURL){
            return res.status(500).json({
                message:"Failed to upload image to cloudinary"
            })
        }

        return res.status(200).json({
            message:"Profile picture uploaded successfully"
        })
   } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"});
   }

}

module.exports = {fetchAllUsers,fetchUser,updateName,updateAbout,profilePicUpload};