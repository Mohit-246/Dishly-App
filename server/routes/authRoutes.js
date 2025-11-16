import express from "express";
import { register, login, getAllUser } from "../controllers/authController.js";
import { verifyToken, authorizeAdmin } from "../middleware/UserAuth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/me", verifyToken, authorizeAdmin, getAllUser);
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);

export default router;
