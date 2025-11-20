import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import RecipeCard from "../components/RecipeCard.jsx";

export default function ExploreRecipe() {
  const { recipes } = useContext(AuthContext);

  return (
    <div className="mt-20 min-h-screen items-center p-8">
      <div>
        <h1 className="text-4xl primary-font font-extrabold text-emerald-500 ">
          Explore Your Favourite Recipe
        </h1>
        <h3 className="text-lg secondary-font font-semibold text-gray-500">
          And Share with your Friends
        </h3>
      </div>
      <div className="flex mt-6 items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          {recipes?.map((item) => (
            <RecipeCard key={item._id} recipe={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
