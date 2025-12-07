import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    // password should be hashed (is not in this exmaple code)
    type: String,
    trim: true,
    required: true,
  },
  emailId: {
    type: String,
    trim: true,
    required: true,
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("user", userSchema);
