const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const isAuth = (req,res,next) => {
    const token = req.cookies?.token;
    
    if(!token){
        return res.status(401).json("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = decoded._id;
        next();
    } catch (error) {
        return res.status(401).json("Unauthorized");
    }


}

module.exports = isAuth;