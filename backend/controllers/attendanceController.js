const Attendance = require('../models/Attendance');

// @desc    Mark attendance (Arrival/Departure)
// @route   POST /api/attendance/mark
// @access  Private
const markAttendance = async (req, res) => {
    try {
        const { type } = req.body; // 'arrival' or 'departure'
        const teacherId = req.user._id;

        // Start of today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        // End of today
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find today's attendance record
        let attendance = await Attendance.findOne({
            teacherId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (type === 'arrival') {
            if (attendance && attendance.arrivalTime) {
                return res.status(400).json({ message: 'Arrival already marked for today' });
            }

            if (!attendance) {
                attendance = new Attendance({
                    teacherId,
                    date: new Date(),
                    arrivalTime: new Date(),
                    status: 'Present' // Simplistic status logic for now
                });
            } else {
                attendance.arrivalTime = new Date();
                attendance.status = 'Present';
            }
            await attendance.save();
            return res.status(200).json(attendance);
        } else if (type === 'departure') {
            if (!attendance || !attendance.arrivalTime) {
                return res.status(400).json({ message: 'Must mark arrival before departure' });
            }
            if (attendance.departureTime) {
                return res.status(400).json({ message: 'Departure already marked for today' });
            }

            attendance.departureTime = new Date();
            await attendance.save();
            return res.status(200).json(attendance);
        } else {
            return res.status(400).json({ message: 'Invalid attendance type' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
const getAttendance = async (req, res) => {
    try {
        let attendance;
        if (req.user.role === 'Admin') {
            attendance = await Attendance.find({}).populate('teacherId', 'name employeeId');
        } else {
            attendance = await Attendance.find({ teacherId: req.user._id });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    markAttendance,
    getAttendance
};
