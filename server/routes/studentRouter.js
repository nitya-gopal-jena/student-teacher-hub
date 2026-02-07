import express from 'express'
import { handleStudentSignup, handleStudentLogin, handleStudentPasswordChange } from '../controllers/studentController.js';
import authenticateStudent from '../middlewares/studentAuthenticator.js';



const router = express.Router();

router.post('/signup', handleStudentSignup);
router.post('/login', handleStudentLogin);
router.patch('/change-password', authenticateStudent, handleStudentPasswordChange);


export default router;


