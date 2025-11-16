import React from "react";
import { Clock, Flame, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

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
        <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>

        {/* Category */}
        <p className="text-sm text-emerald-600 font-semibold">
          {recipe.category}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {recipe.description}
        </p>

        {/* Info Row */}
        <div className="flex justify-between items-center text-gray-700 text-sm font-medium pt-2">
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
          <button
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            className="px-4 py-1 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 duration-200 text-sm font-semibold"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
