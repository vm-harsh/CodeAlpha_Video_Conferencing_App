const express = require('express');
const { fetchAllUsers, fetchUser, updateName, updateAbout, profilePicUpload } = require('../controllers/userController');
const isAuth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

const router = express.Router();


router.get('/get-all-users',isAuth,fetchAllUsers);
router.get('/get-user/:id',isAuth,fetchUser);
router.put('/update-name',isAuth,updateName);
router.put('/update-about',isAuth,updateAbout);
router.post('upload-profile',isAuth,upload.single('image'),profilePicUpload);


module.exports = router;