import express from "express";
import {
  getUser,
  updatedUser,
  deleteUser,
} from "../controllers/userController.js";

import { authorizeAdmin, authorizeUser } from "../middleware/UserAuth.js";

const router = express.Router();

router.get("/:id",  getUser);
router.put("/:id", authorizeUser, authorizeAdmin, updatedUser);
router.delete("/:id", authorizeUser, authorizeAdmin, deleteUser);

export default router;
