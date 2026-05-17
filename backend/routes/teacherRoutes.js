const express = require('express');
const { getTeachers, getTeacherProfile, registerTeacher } = require('../controllers/teacherController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, admin, getTeachers)
    .post(protect, admin, registerTeacher);

router.route('/profile')
    .get(protect, getTeacherProfile);

module.exports = router;
