import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectDb = async () => {
  console.log("MongoDB URI:", MONGODB_URL);

  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected successfully");
};

export default connectDb;
