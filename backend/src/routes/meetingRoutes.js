const express = require('express');
const isAuth = require('../middlewares/authMiddleware');
const { createMeeting, joinMeeting, findMeeting, endMeeting, meetingHistory, leaveMeeting } = require('../controllers/meetingController');

const router = express.Router();


router.post('/create',isAuth,createMeeting);
router.post('/join',isAuth,joinMeeting);
router.get('/:meetingId',isAuth,findMeeting);
router.patch('/:meetingId/end',isAuth,endMeeting)
router.patch('/:meetingId/leave',isAuth,leaveMeeting)
router.get('/history',isAuth,meetingHistory)










module.exports = router;