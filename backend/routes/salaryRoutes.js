const express = require('express');
const { generateSalary, getSalaries } = require('../controllers/salaryController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getSalaries);

router.route('/generate')
    .post(protect, admin, generateSalary);

module.exports = router;
