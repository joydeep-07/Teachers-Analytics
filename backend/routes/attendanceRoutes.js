const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getAttendance);

router.route('/mark')
    .post(protect, markAttendance);

module.exports = router;
