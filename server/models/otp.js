import mongoose from 'mongoose';


const otpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 }
})

const Otp = mongoose.model('otp', otpSchema);
export default Otp;