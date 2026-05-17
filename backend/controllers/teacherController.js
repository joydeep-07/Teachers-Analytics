const Teacher = require('../models/Teacher');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get teacher profile
// @route   GET /api/teachers/profile
// @access  Private
const getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.user._id);
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new teacher
// @route   POST /api/teachers
// @access  Private/Admin
const registerTeacher = async (req, res) => {
    try {
        const { name, email, password, phone, department, teacherType, salary, joiningDate, role } = req.body;

        const teacherExists = await Teacher.findOne({ email });

        if (teacherExists) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        // Generate Employee ID (EID0001, EID0002, etc.)
        const count = await Teacher.countDocuments();
        const employeeId = `EID${(count + 1).toString().padStart(4, '0')}`;

        const teacher = await Teacher.create({
            name,
            email,
            password,
            employeeId,
            phone,
            department,
            teacherType,
            salary,
            joiningDate,
            role
        });

        if (teacher) {
            res.status(201).json({
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                employeeId: teacher.employeeId,
                role: teacher.role
            });
        } else {
            res.status(400).json({ message: 'Invalid teacher data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeachers,
    getTeacherProfile,
    registerTeacher
};
