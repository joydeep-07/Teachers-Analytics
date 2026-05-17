const Teacher = require('../models/Teacher');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Teacher.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                employeeId: user.employeeId,
                role: user.role,
                avatar: user.avatar
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { authUser, logoutUser };
