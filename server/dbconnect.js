"use strict";

import mongoose from "mongoose";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

// Connect to MongoDB

export const connectDB = async (uri) => {
  if (mongoose.connection.readyState === 0) {
    // 0 = disconnected
    await mongoose.connect(uri);
    console.log("--- Connected to MongoDB ---");
  }
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// binds error event
export default mongoose;
