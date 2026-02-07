import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, default: 'stud' },
    otp: { type: String },
    otpExpiry: { type: Number }

})


const Student = mongoose.model('student', studentSchema);
export default Student;