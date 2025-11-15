import express from "express";
import { register, login, getAllUser } from "../controllers/authController.js";
import { verifyToken, authorizeAdmin } from "../middleware/UserAuth.js";

const router = express.Router();

router.get("/me", verifyToken, authorizeAdmin, getAllUser);
router.post("/register", register);
router.post("/login", verifyToken, login);

export default router;
