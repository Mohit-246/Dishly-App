import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    ingredient: [String],
    steps: [String],
    image: { type: String, required: true },
    cookingTime: String,
    difficulty: String,
    category: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
