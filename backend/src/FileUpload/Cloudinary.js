const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (localFilePath) => {
    try {
        
        if(!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath);
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Cloudinary upload failed:",error);
        return null;
    }
}


module.exports = uploadToCloudinary;