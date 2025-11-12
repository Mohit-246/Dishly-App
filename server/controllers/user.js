import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokens from "../config/jwtokens.js";

export const register = async (req, res) => {
  try {
    const {name, username, email, password} = req.body;
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
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Provide All Required Details",
      });
    }

    const detail = username || email;
    const userExist = await User.findOne(detail);
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User Does not Exist",
      });
    }
    const isMatched = await bcrypt.compare(password, userExist.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Logged in Successfully",
      userExist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found Successfully",
      user,
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
    const { isAdmin } = req.body;
    if (!isAdmin) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    const users = await User.findOne();
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

export const updatedUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
