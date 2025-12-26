import mongoose from "mongoose";

export const connectDB = async () => {
  const atlasURI = process.env.MONGO_URI_ATLAS;
  const localURI = process.env.MONGO_URI_LOCAL;

  try {
    // Try connecting to Atlas first
    await mongoose.connect(atlasURI);
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.warn("Could not connect to Atlas, falling back to local MongoDB...");
    try {
      await mongoose.connect(localURI);
      console.log("Connected to local MongoDB!");
    } catch (localError) {
      console.error("Failed to connect to local MongoDB as well:", localError);
      process.exit(1);
    }
  }
}; 