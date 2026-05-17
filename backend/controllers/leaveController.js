const Leave = require('../models/Leave');

// @desc    Apply for leave
// @route   POST /api/leaves/apply
// @access  Private
const applyLeave = async (req, res) => {
    try {
        const { leaveDate, reason } = req.body;
        const teacherId = req.user._id;

        const leave = await Leave.create({
            teacherId,
            leaveDate,
            reason,
            status: 'Pending'
        });

        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get leaves
// @route   GET /api/leaves
// @access  Private
const getLeaves = async (req, res) => {
    try {
        let leaves;
        if (req.user.role === 'Admin') {
            leaves = await Leave.find({}).populate('teacherId', 'name employeeId');
        } else {
            leaves = await Leave.find({ teacherId: req.user._id });
        }
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update leave status
// @route   PUT /api/leaves/:id/status
// @access  Private/Admin
const updateLeaveStatus = async (req, res) => {
    try {
        const { status, remarks } = req.body;
        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }

        leave.status = status || leave.status;
        leave.remarks = remarks || leave.remarks;

        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    applyLeave,
    getLeaves,
    updateLeaveStatus
};
