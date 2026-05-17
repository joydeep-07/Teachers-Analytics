const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    leaveDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Leave', leaveSchema);
