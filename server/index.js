import express from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/studentRouter.js';
import cors from 'cors';

const app = express();
configDotenv();

// Middlewares
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

// Add router path for student
app.use('/api/students', router);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`The server running at http://${HOST}:${PORT}`);
  connectDB();
});
