import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9_]+$/, // triggering validation error when different symbols used
  },
  password: {
    // password should be hashed (is not in this example code)
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  emailId: {
    type: String,
    trim: true,
    unique: true,
    required: false,
    sparse: true,
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

// converts profilepic to base64 when res.json called later
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    if (ret.profilePic && ret.profilePic.data) {
      if (Buffer.isBuffer(ret.profilePic.data)) {
        ret.profilePic.data = ret.profilePic.data.toString("base64");
      }
    }
    return ret;
  },
});

export const User = mongoose.model("user", userSchema);
