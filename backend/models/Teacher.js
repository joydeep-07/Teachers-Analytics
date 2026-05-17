const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    employeeId: {
        type: String,
        required: [true, 'Please add an employee ID'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String
    },
    department: {
        type: String
    },
    teacherType: {
        type: String,
        enum: ['Permanent', 'Contractual'],
        default: 'Permanent'
    },
    salary: {
        type: Number,
        default: 0
    },
    bankDetails: {
        accountNumber: String,
        ifscCode: String,
        bankName: String
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['Admin', 'Teacher'],
        default: 'Teacher'
    }
}, {
    timestamps: true
});

// Encrypt password using bcrypt
teacherSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
teacherSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Teacher', teacherSchema);
