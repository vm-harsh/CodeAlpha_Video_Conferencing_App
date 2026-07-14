const express = require('express');
const isAuth = require('../middlewares/authMiddleware');
const { createMeeting, joinMeeting, findMeeting, endMeeting, meetingHistory } = require('../controllers/meetingController');

const router = express.Router();


router.post('/create',isAuth,createMeeting);
router.post('/join',isAuth,joinMeeting);
router.get('/:meetingId',isAuth,findMeeting);
router.patch('/:meetingId/end',isAuth,endMeeting)
router.get('/history',isAuth,meetingHistory)










module.exports = router;