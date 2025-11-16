import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Recipe from "../models/recipe.js";

// Verifying Tokens
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password"); // remove password field
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Is User Admin
export const authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
  next();
};

// User Authorisation
export const authorizeUser = (req, res, next) => {
  const { id } = req.params;
  if (req.user._id.toString() !== id) {
    return res
      .status(403)
      .json({ message: "Forbidden: You can only modify your own account." });
  }

  next();
};

// authorizeRecipeOwner
export const authorizeRecipeOwner = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Check if the logged-in user is the author or an admin
    if (
      recipe.author.toString() === req.user._id.toString() ||
      req.user.isAdmin
    ) {
      req.recipe = recipe;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only author or admin can modify this recipe.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authorization check failed",
      error,
    });
  }
};
