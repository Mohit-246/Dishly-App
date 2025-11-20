import React, { useContext, useEffect } from "react";
import useRecipeHooks from "../hooks/useRecipeHooks";
import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthContext";
import { useParams, NavLink } from "react-router-dom";
import { Pencil } from "lucide-react";

export default function AuthorProfilePage() {
  const { id } = useParams();
  const { getAuthorProfile } = useRecipeHooks();
  const { profile, recipes } = useContext(AuthContext);
  const usersRecipes = recipes.filter(
    (recipe) => recipe.author === profile?._id
  );
  useEffect(() => {
    getAuthorProfile(id);
  },[id]);

  if (!profile) return <Loader />;
  return (
    <>
      <div className="my-20 min-h-screen w-full bg-gray-100">
        {/* Top Banner */}
        <div
          className="w-full h-48 md:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.avatar})` }}
        ></div>

        {/* Profile Section */}
        <div className="max-w-5xl mx-auto px-4 -mt-16">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="mt-4">
                <h1 className="text-3xl primary-font font-extrabold flex items-center gap-2">
                  {profile.name}{" "}
                  <span className="text-blue-600 text-xl">●</span>
                </h1>
                <p className="secondary-font font-semibold text-gray-700">
                  @{profile.username}
                </p>
              </div>

              {/* About */}
              <p className="mt-4 para-font text-gray-700 max-w-2xl">
                {profile.description}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 secondary-font font-medium items-center bg-white shadow p-6 rounded-xl space-y-3">
            <p>
              <span className="font-semibold">Email:</span> {profile.email}
            </p>
            <hr />
            <div className="mt-8">
              <div className=" flex items-center  justify-between px-6">
                <h3 className=" text-2xl font-bold">Recipes</h3>
              </div>
              {usersRecipes.length > 0 ? (
                <div className=" mt-8 px-4 grid md:grid-cols-2 grid-cols-1">
                  {usersRecipes?.map((item) => (
                    <RecipeCard key={item._id} recipe={item} />
                  ))}
                </div>
              ) : (
                <>
                  <h3 className="text-center mt-8 font-semibold text-gray-500">
                    User Don't Have Any Recipe
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
