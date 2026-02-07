import express from 'express'
import { handleStudentSignup, handleStudentLogin, handleStudentPasswordChange, handleStudentAccountDelete } from '../controllers/studentController.js';
import authenticateStudent from '../middlewares/studentAuthenticator.js';



const router = express.Router();

router.post('/signup', handleStudentSignup);
router.post('/login', handleStudentLogin);
router.patch('/me/change-password', authenticateStudent, handleStudentPasswordChange);
router.delete('/account/me', authenticateStudent, handleStudentAccountDelete);


export default router;


