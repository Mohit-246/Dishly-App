import express from "express";

import {
  addRecipe,
  getRecipe,
  getAllRecipes,
  editRecipe,
  deleteRecipe,
  likeRecipe,
  getLikedRecipes,
} from "../controllers/recipeController.js";

import {
  authMiddleware,
  authorizeRecipeOwner,
  authorizeUser,
} from "../middleware/UserAuth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

const uploadRecipes = upload("recipes");

router.post(
  "/create",
  authMiddleware,
  uploadRecipes.single("image"),
  addRecipe
);
router.post("like/:id", likeRecipe);

router.get("/all", getAllRecipes);
router.get("/:id", getRecipe);
router.get("/liked", getLikedRecipes);

router.put("/:id", authorizeRecipeOwner, editRecipe);

router.delete("/:id", authorizeRecipeOwner, deleteRecipe);

export default router;
