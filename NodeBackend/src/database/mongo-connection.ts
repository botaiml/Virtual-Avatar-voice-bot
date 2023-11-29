import mongoose from 'mongoose';
const MONGODBCONN = 'mongodb://localhost:27017/AvatarDb';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODBCONN);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(error?.message);
    process.exit(1);
  }
};
