"use strict";

import mongoose from "mongoose";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("--- Connected to MongoDB ---");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// binds error event
export default mongoose;
