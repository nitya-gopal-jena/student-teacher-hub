import Student from '../models/student.js';
import Otp from '../models/otp.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import generateToken from '../utils/token.js';
import { currentStudentId } from '../utils/authUtils.js';




// Student signup logic
export const handleStudentSignup = async (req, res) => {
    try {
        const { name, email, age, password, role } = req.body;

        if (req.body === undefined) {
            return res.status(400).json({ message: 'Please provide all the neccessary data to proceed' });
        }

        if (!name || !email || !age || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({ message: 'Password length should between 6 to 20' });
        }

        const studentExist = await Student.findOne({ email });
        if (studentExist) {
            return res.status(409).json({ message: 'Student with this email already exist' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({ name, email, age, role, password: hashPassword });
        newStudent.save();

        return res.status(201).json({ message: 'Student account created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Student login logic
export const handleStudentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const studentExist = await Student.findOne({ email });

        if (!studentExist) {
            return res.status(400).json({ message: 'User not present' });
        }

        const isPassMatch = await bcrypt.compare(password, studentExist.password);
        if (!isPassMatch) {
            return res.status(400).json({ message: 'Invalid Password!' });
        }


        // generate the 6 digit otp 
        const otpCode = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        const hashOtp = await bcrypt.hash(otpCode, 10);

        await Otp.create({
            studentId: studentExist._id,
            otp: hashOtp,
            expiresAt: otpExpiry,
        });

        return res.status(200).json({ message: 'Otp send successfully please verify to login' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Change student password using JWT
export const handleStudentPasswordChange = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (req.body === undefined) {
            return res.status(400).json({ message: 'Please provide all the neccessary data to proceed!' });
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password should be same ' });
        }

        if (newPassword.length < 6 || newPassword.length > 20) {
            return res.status(400).json({ message: 'Password length should be between 6 and 20 characters.' });
        }

        if (currentPassword == newPassword) {
            return res.status(400).json({ message: 'New password and current password should not be same!' });
        }

        const studentId = currentStudentId(req);
        const studentExist = await Student.findById(studentId);
        if (!studentExist) {
            return res.status(401).json({ message: 'Student not exist!' });
        }

        const isPassMatch = await bcrypt.compare(currentPassword, studentExist.password);
        if (!isPassMatch) {
            return res.status(401).json({ message: 'Invalid current password!' });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        studentExist.password = hashPassword;
        studentExist.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

// Delete student account logic
export const handleStudentAccountDelete = async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required to proceed with account deletion.' });
        }

        const studentId = currentStudentId(req);
        const studentExist = await Student.findById(studentId);
        if (!studentExist) {
            return res.status(404).json({ message: 'Account not found ' });
        }

        const isPassMatch = await bcrypt.compare(password, studentExist.password);
        if (!isPassMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await Student.findByIdAndDelete(studentId);

        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

