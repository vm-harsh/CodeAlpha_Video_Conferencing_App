const express = require('express');
const { userSignUp, userLogIn, userLogOut, socialLogin } = require('../controllers/authController');
const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup',userSignUp);
router.post('/login',userLogIn);
router.get('/logout',isAuth,userLogOut);
router.post('/social-login',socialLogin);

module.exports = router;