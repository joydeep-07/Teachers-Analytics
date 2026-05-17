const Salary = require('../models/Salary');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');

// @desc    Generate salary for a month
// @route   POST /api/salary/generate
// @access  Private/Admin
const generateSalary = async (req, res) => {
    try {
        const { teacherId, month } = req.body;
        
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Logic to calculate deductions based on attendance/leaves could go here
        // For simplicity, we just take base salary and deduct any manual deductions
        const baseSalary = teacher.salary || 0;
        const deductions = req.body.deductions || 0;
        const finalSalary = baseSalary - deductions;

        const salary = await Salary.create({
            teacherId,
            month,
            baseSalary,
            deductions,
            finalSalary
        });

        res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get salaries
// @route   GET /api/salary
// @access  Private
const getSalaries = async (req, res) => {
    try {
        let salaries;
        if (req.user.role === 'Admin') {
            salaries = await Salary.find({}).populate('teacherId', 'name employeeId');
        } else {
            salaries = await Salary.find({ teacherId: req.user._id });
        }
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    generateSalary,
    getSalaries
};
