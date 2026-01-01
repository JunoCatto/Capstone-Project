import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model("comment", commentSchema);
