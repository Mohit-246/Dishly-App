import React from "react";
import { Clock, Flame, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import userRecipeHooks from "../hooks/useRecipeHooks";

export default function RecipeCard({ recipe }) {
  const { getRecipe } = userRecipeHooks();
  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl duration-300 overflow-hidden max-w-sm">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-110 duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h2 className="text-xl font-bold primary-font text-gray-800">
          {recipe.title}
        </h2>

        {/* Category */}
        <p className="text-sm secondary-font text-emerald-600 font-semibold">
          {recipe.category}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm secondary-font line-clamp-2">
          {recipe.description}
        </p>

        {/* Info Row */}
        <div className="flex justify-between items-center para-font text-gray-700 text-sm font-medium pt-2">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-3">
          {/* Like Button */}
          <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
            <Heart size={18} />
          </button>

          {/* View Recipe */}
          <NavLink to={`/recipe/${slugify(recipe?.title || "")}/${recipe._id}/`}>
            <button
              onClick={() => getRecipe(recipe._id)}
              className="px-4 py-1 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 duration-200 text-sm font-semibold"
            >
              View Recipe
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
