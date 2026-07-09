const express = require('express');
const { userSignUp, userLogIn, userLogOut } = require('../controllers/authController');
const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogIn);
router.get('/logout',isAuth,userLogOut);

module.exports = router;