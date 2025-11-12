import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  addedDishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Recipe",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
