const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    arrivalTime: {
        type: Date
    },
    departureTime: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Absent'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', attendanceSchema);
