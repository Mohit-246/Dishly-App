import express from "express";

import {
  addRecipe,
  getRecipe,
  getAllRecipes,
  editRecipe,
  deleteRecipe,
} from "../controllers/recipe.js";

import { verifyToken, authorizeRecipeOwner } from "../middleware/UserAuth.js";

const router = express.Router();

router.post("/", verifyToken, addRecipe);
router.get("/all", getAllRecipes);
router.get("/:id", getRecipe);
router.put("/:id", authorizeRecipeOwner, editRecipe);
router.delete("/:id", authorizeRecipeOwner, deleteRecipe);

export default router;
