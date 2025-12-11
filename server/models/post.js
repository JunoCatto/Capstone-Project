import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  // need to add comments
  userId: {
    type: String,
    required: true,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("post", postSchema);
