import express from "express";
import {
  register,
  login,
  getAllUser,
  getMyProfile,
} from "../controllers/authController.js";
import { verifyToken, authorizeAdmin } from "../middleware/UserAuth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

const uploadUser = upload("user");

router.get("/admin", verifyToken, authorizeAdmin, getAllUser);
router.get("/me", verifyToken, getMyProfile);
router.post("/register", uploadUser.single("avatar"), register);
router.post("/login", login);

export default router;
