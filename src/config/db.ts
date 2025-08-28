import colors from 'colors'
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || ""
    const connection = await mongoose.connect(MONGODB_URI);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.green('MongoDB connected'), url);
  } catch (error) {
    console.error(colors.red('MongoDB connection error:'), error);
    process.exit(1);
  }
};
