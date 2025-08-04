import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not set.");
    }
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });
    await mongoose.connect(uri);
}
export default connectDB;