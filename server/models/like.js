import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "post",
    required: true,
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

likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Like = mongoose.model("like", likeSchema);
