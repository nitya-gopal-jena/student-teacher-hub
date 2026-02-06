import mongoose from 'mongoose';

const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  try {
    await mongoose.connect(URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database not connected !', error);
  }
};
export default connectDB;
