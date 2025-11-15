import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: String,
    password: String,
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
