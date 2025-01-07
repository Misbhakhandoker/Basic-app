import mongoose from "mongoose";

export default async function connectToDB() {
  const mongoURI = process.env.MONGOURI;
  if (!mongoURI) {
    throw new Error("MONGOURI is not defined in the environment variables");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log(`Server error: database connection error ${error}`);
  }
}
