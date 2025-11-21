import React, { useContext, useEffect } from "react";
import useRecipeHooks from "../hooks/useRecipeHooks.js";
import useUserHooks from "../hooks/useUserHooks.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { ShieldUser } from "lucide-react";

export default function AdminDashboard() {
  const { allUsers, recipes } = useContext(AuthContext);
  const { getAllUsers, getUser } = useUserHooks();
  const { getAllRecipe, getRecipe } = useRecipeHooks();
  useEffect(() => {
    getAllRecipe();
    getAllUsers();
  }, []);

  return (
    <>
      <div className="mt-20 flex justify-center items-center">
        <div className="p-6 w-full ">
          <h1 className=" flex items-center gap-6 text-4xl font-extrabold primary-font text-emerald-800 mt-4 mb-8">
            <ShieldUser size={45}/> Admin DashBoard
          </h1>
          {/* Users Section */}
          <div className="p-4 rounded-xl shadow-lg mb-4">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl primary-font text-emerald-700 font-bold mb-4">
                Users
              </h2>
              <h2 className="text-2xl primary-font text-white bg-emerald-600 p-1 rounded-full font-bold  mb-4">
                {allUsers.length}
              </h2>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Name
                  </th>
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Email
                  </th>
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Username
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-2 text-sm para-font ">{user.name}</td>
                    <td className="p-2 text-sm para-font">{user.email}</td>
                    <td className="p-2 text-sm para-font">@{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recipes Section */}
          <div className="p-4 rounded-xl shadow-lg mb-4">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl primary-font text-emerald-700 font-bold  mb-4">
                Recipes
              </h2>
              <h2 className="text-2xl primary-font text-white bg-emerald-600 p-1 rounded-full font-bold  mb-4">
                {recipes.length}
              </h2>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Recipe Name
                  </th>
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Category
                  </th>
                  <th className="p-2 text-lg secondary-font font-bold text-left">
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody>
                {recipes?.map((recipe) => (
                  <tr key={recipe._id} className="border-b">
                    <td className="p-2 text-sm para-font">{recipe.title}</td>
                    <td className="p-2 text-sm para-font">{recipe.category}</td>
                    <td className="p-2 text-sm para-font">
                      {recipe.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
