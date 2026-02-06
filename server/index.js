import express from 'express';
import { configDotenv } from 'dotenv'
import connectDB from './config/db.js';
import router from './routes/studentRouter.js';

const app = express();
configDotenv();

// Middlewares 
app.use('/api/stud', router);



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
    console.log(`The server running at http://${HOST}:${PORT}`);
    connectDB()
})