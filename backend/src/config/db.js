import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MONGODB");
  } catch (error) {
    console.error("Can't connect to mongodb: ", error);
    process.exit(1);
  }
};
