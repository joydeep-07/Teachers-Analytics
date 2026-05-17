const express = require('express');
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getLeaves);

router.route('/apply')
    .post(protect, applyLeave);

router.route('/:id/status')
    .put(protect, admin, updateLeaveStatus);

module.exports = router;
