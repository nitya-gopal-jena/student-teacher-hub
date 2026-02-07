import express from 'express'
import { handleStudentSignup, handleStudentLogin } from '../controllers/studentController.js';

const router = express.Router();

router.post('/signup', handleStudentSignup);
router.post('/login', handleStudentLogin);


export default router;


