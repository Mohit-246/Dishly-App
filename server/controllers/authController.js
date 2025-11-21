import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokens from "../config/jwtokens.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Provide All Neccessary  Details",
      });
    }
    const userExist = await User.findOne({ username, email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      avatar: req.file?.path,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      newUser,
      token: generateTokens(newUser._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Provide all required details",
      });
    }

    let userExist;

    // Check whether identifier is email or username
    if (identifier.includes("@")) {
      userExist = await User.findOne({ email: identifier });
    } else {
      userExist = await User.findOne({ username: identifier });
    }

    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatched = await bcrypt.compare(password, userExist.password);

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userExist,
      token: generateTokens(userExist._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No User Available",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    // req.user is already decoded from middleware
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
