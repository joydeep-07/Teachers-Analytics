const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    month: {
        type: String, // e.g. "January 2026"
        required: true
    },
    baseSalary: {
        type: Number,
        required: true
    },
    deductions: {
        type: Number,
        default: 0
    },
    finalSalary: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Salary', salarySchema);
