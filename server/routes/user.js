import express from "express";
import {
  register,
  login,
  getUser,
  getAllUser,
  updatedUser,
  deleteUser,
} from "../controllers/user.js";

import {
  verifyToken,
  authorizeAdmin,
  authorizeUser,
} from "../middleware/UserAuth.js";

const router = express.Router();

router.get("/all", verifyToken, authorizeAdmin, getAllUser);
router.post("/register", register);
router.post("/login", verifyToken, login);
router.get("/:id", verifyToken, authorizeUser, getUser);
router.put("/:id", verifyToken, authorizeUser, authorizeAdmin, updatedUser);
router.delete("/:id", verifyToken, authorizeUser, authorizeAdmin, deleteUser);

export default router;
