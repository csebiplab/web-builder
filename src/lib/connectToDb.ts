import mongoose from "mongoose";
import { envConfig } from "./envConfig";

const MONGO_URI = envConfig.mongodbUri;

export const connectToDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, { connectTimeoutMS: 20000 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection failed");
  }
};
