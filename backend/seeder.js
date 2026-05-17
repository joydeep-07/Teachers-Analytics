const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Teacher = require('./models/Teacher');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        const adminExists = await Teacher.findOne({ email: 'admin@kv.com' });
        
        if (!adminExists) {
            await Teacher.create({
                name: 'System Admin',
                email: 'admin@kv.com',
                employeeId: 'ADM0001',
                password: 'password123', // will be hashed by pre-save hook
                role: 'Admin',
                teacherType: 'Permanent'
            });
            console.log('Admin user created!');
        } else {
            console.log('Admin user already exists.');
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
