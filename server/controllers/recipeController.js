import { json } from "express";
import Recipe from "../models/recipe.js";

export const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredient, steps, category, cookingTime } =
      req.body;
    if (!title || !description || !ingredient) {
      return res.status(400).json({
        success: false,
        message: `Recipe not Added`,
      });
    }
    const newRecipe = new Recipe({
      title,
      description,
      ingredient: ingredient,
      steps: steps,
      category,
      cookingTime,
      image: req.file?.path,
      author: req.user._id,
    });

    await newRecipe.save();
    return res.status(201).json({
      success: true,
      message: `Recipes Posted Successfully`,
      newRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occured ${error.message}`,
    });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `Invalid Request`,
      });
    }
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe Does not Exist `,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Recipe Found Successfully`,
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error Occured ${error.message}`,
    });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(404).json({
        success: false,
        message: `No Recipes Available`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Recipes Found Successfully`,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error Occured ${error.message}`,
    });
  }
};

export const editRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `Provide a Valid Recipe Id`,
      });
    }
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(205).json({
      success: true,
      message: `Recipe Updated Successfully`,
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error Occured ${error.message}`,
    });
  }
};

export const likeRecipe = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        sucess: false,
        message: "Recipe Not found",
      });
    }
    const alreadyLiked = recipe.likes.includes(userId);
    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(
        (id) => id.toString() !== user.toString()
      );
      await recipe.save();
      return res.status(200).json({
        success: true,
        message: "Recipe Unliked ",
        likes: recipe.likes.length,
      });
    }

    recipe.likes.push(userId);
    await recipe.save();
    return res.status(200).json({
      success: true,
      message: "Recipe Liked Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLikedRecipes = async (req, res) => {
  const userId = req.user._id;
  try {
    const likedRecipes = await Recipe.find({ likes: userId }).populate(
      "author",
      "name email"
    );
    res.status(200).json({
      success: true,
      message: "Liked Recipes Found",
      likedRecipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: `Recipe Request Denied`,
      });
    }
    const recipe = await Recipe.findByIdAndDelete(id);
    return res.status(200).json({
      success: false,
      message: `Recipe Deleted Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error Occurred ${error.message}`,
    });
  }
};
