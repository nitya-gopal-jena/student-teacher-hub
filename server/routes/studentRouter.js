import express from 'express'
import { handleStudentSignup, handleStudentLogin, handleStudentPasswordChange, handleStudentAccountDelete, handleVerifyOtp, handleUpdateProfile } from '../controllers/studentController.js';
import authenticateStudent from '../middlewares/studentAuthenticator.js';



const router = express.Router();

router.post('/signup', handleStudentSignup);
router.post('/login', handleStudentLogin);
router.post('/login/verify-otp', handleVerifyOtp);
router.patch('/me/change-password', authenticateStudent, handleStudentPasswordChange);
router.put('/update/me/:id', authenticateStudent, handleUpdateProfile);
router.delete('/account/me', authenticateStudent, handleStudentAccountDelete);


export default router;


