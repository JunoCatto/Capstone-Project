import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const postSchema = new Schema({
  author: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    userName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  // need to add comments

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model("post", postSchema);
