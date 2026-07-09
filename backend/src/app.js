const express = require('express');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.get('/',(req,res)=> console.log("hello"))
app.use('/auth',authRoutes);
app.use('/user',userRoutes);




module.exports = app;
