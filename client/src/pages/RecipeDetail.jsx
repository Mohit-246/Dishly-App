import { Clock, ChefHat, Flame, Heart, ExternalLink } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useRecipeHooks from "../hooks/useRecipeHooks";
import Loader from "../components/Loader";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const { deleteRecipe, getRecipe } = useRecipeHooks();
  const { user, recipe, profile } = useContext(AuthContext);

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s]+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  if (!recipe || !profile) return <Loader />;

  if (!recipe) {
    return (
      <div className="md:h-screen text-center mt-30 font-black text-gray-400 primary-font ">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="mt-20 w-full min-h-screen bg-gray-50 pb-10">
      {/* Top Image */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-2 rounded-full shadow-md"
        >
          ←
        </button>

        {/* Like Button */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md">
          <Heart className="h-5 w-5 text-red-500" />
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-white mx-4 -mt-10 rounded-xl p-6 shadow-lg relative z-10">
        {/* Title */}
        <h1 className="text-2xl font-extrabold primary-font text-gray-800">
          {recipe.title}
        </h1>

        <p className="text-gray-600 secondary-font font-semibold mt-2">
          {recipe.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mt-5 para-font">
          <div className="flex flex-col items-center">
            <Clock className="text-red-500 h-5 w-5" />
            <span className="text-sm text-gray-700">{recipe.cookingTime}</span>
          </div>

          <div className="flex flex-col items-center">
            <ChefHat className="text-red-500 h-5 w-5" />
            <span className="text-sm text-gray-700">{recipe.difficulty}</span>
          </div>

          <div className="flex flex-col items-center">
            <Flame className="text-red-500 h-5 w-5" />
            <span className="text-sm text-gray-700">{recipe.category}</span>
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6 mx-4 bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 secondary-font mb-4">
          Ingredients
        </h2>

        <ul className="space-y-2 text-gray-700 para-font">
          {recipe.ingredient.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-6 mx-4 bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-800 secondary-font mb-4">
          Steps
        </h2>

        <ol className="list-decimal list-inside space-y-3 para-font text-gray-700">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="mt-6 mx-4 bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold secondary-font text-gray-800 mb-4">
          Author
        </h2>
        <p className=" para-font text-gray-700">{profile?.name || "Unknown"}</p>
        <NavLink
          to={`/recipe/author/${slugify(profile.name)}/${profile?._id}`}
          className={`flex items-center text-blue-500`}
        >
          <ExternalLink />{" "}
          <span className="text-sm para-font">Visit Author Profile</span>
        </NavLink>
      </div>
      {user._id === profile?._id && (
        <>
          <div className="mt-6 mx-4 bg-white rounded-xl p-6 shadow">
            {showAlert ? (
              <>
                <p className="text-gray-600 text-xl font-bold para-font">
                  Are you sure you want to delete the Recipe??{" "}
                </p>
                <div className="flex  gap-8">
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="text-white  px-4 py-2 font-semibold secondary-font bg-red-600 rounded-2xl shadow-2xs"
                  >
                    Delete
                  </button>
                  <button
                    className="text-gray-700  px-4 py-2 bg-gray-300 font-semibold secondary-font rounded-2xl shadow-2xs"
                    onClick={() => setShowAlert(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex  gap-8">
                  <button className="text-white px-4 py-2 font-semibold secondary-font bg-blue-600 rounded-2xl shadow-2xs">
                    Update
                  </button>
                  <button
                    className="text-white px-4 py-2 font-semibold secondary-font bg-red-600 rounded-2xl shadow-2xs"
                    onClick={() => setShowAlert(true)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
