import Student from '../models/student.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';

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

        if (req.body === undefined) {
            return res.status(400).json({ message: 'Please provide all the necessary data to proceed!' });
        }

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

        // Generate jwt token
        const token = generateToken(studentExist);

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

