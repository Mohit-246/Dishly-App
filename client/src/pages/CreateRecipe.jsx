import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useRecipeHooks from "../hooks/useRecipeHooks";
import { toast } from "react-toastify";
export default function CreateRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredient: [""],
    steps: [""],
    cookingTime: "",
    category: "",
    difficulty: "",
    img: File,
  });

  const {} = useContext(AuthContext);
  const { createRecipe } = useRecipeHooks();

  /* Basic Inpupt Handler */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  /** Ingredient Handler */
  const handleIngredientChange = (index, value) => {
    const updated = [...recipeData.ingredient];
    updated[index] = value;

    setRecipeData((prev) => ({
      ...prev,
      ingredient: updated,
    }));
  };

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredient: [prev.ingredient, ""],
    }));
  };

  const removeIngredient = (index) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredient: prev.ingredient.filter((_, i) => i != index),
    }));
  };

  /** Steps Handler */
  const handleStepsChange = (index, value) => {
    const updated = [...recipeData.steps];
    updated[index] = value;

    setRecipeData((prev) => ({
      ...prev,
      steps: updated,
    }));
  };

  const addSteps = () => {
    setRecipeData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
  };

  const removeSteps = (index) => {
    setRecipeData(
      (prev = {
        ...prev,
        steps: prev.steps.filter((_, i) => i != index),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      recipeData.title.trim() === "" ||
      recipeData.description.trim() === "" ||
      recipeData.img === null
    ) {
      return toast.error("Please fill All the required Field");
    }

    const formDataToSend = new FormData();

    /* Append Normal Fields */
    formDataToSend.append("title", recipeData.title);
    formDataToSend.append("description", recipeData.description);
    formDataToSend.append("category", recipeData.category);
    formDataToSend.append("difficulty", recipeData.difficulty);
    formDataToSend.append("image", recipeData.img);
    formDataToSend.append("cookingTime", recipeData.cookingTime);
    recipeData.ingredient.forEach((ing, i) => {
      formDataToSend.append(`ingredient[${i}]`, ing);
    });
    recipeData.steps.forEach((step, i) => {
      formDataToSend.append(`steps[${i}]`, step);
    });
    createRecipe(formDataToSend);
  };

  return (
    <>
      <div className="mt-20 min-h-screen bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold primary-font text-center mb-6 text-emerald-600">
            Add Your New Recipe
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="block font-semibold secondary-font mb-1">
                Recipe Title*
              </label>
              <input
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 secondary-font font-semibold focus:outline-none"
                placeholder="e.g., Panner Butter Masale"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block font-semibold secondary-font mb-1">
                Description*
              </label>
              <textarea
                name="description"
                value={recipeData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-200 secondary-font font-semibold focus:outline-none"
                placeholder="Describe your Recipe"
                required
              />
            </div>

            <div className="flex items-center gap-6">
              {/* DIFFICULTY */}
              <div>
                <label className="block font-semibold secondary-font mb-1">
                  Difficulty*
                </label>
                <select
                  name="difficulty"
                  value={recipeData.difficulty}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-200 secondary-font text-gray-500 font-semibold focus:outline-none"
                  required
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block font-semibold secondary-font mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={recipeData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-200 secondary-font text-gray-500 font-semibold focus:outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snacks">Snacks</option>
                  <option value="main dish">Main Dish</option>
                  <option value="dessert">Desset</option>
                </select>
              </div>
            </div>

            {/* INGREDIENT lIST */}
            <div>
              <label className="font-semibold secondary-font mb-1">
                Ingredient
              </label>
              {recipeData.ingredient.map((item, index) => (
                <div key={index} className="flex gap-2 ">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      handleIngredientChange(index, e.target.value);
                    }}
                    className="w-full my-2 p-2 secondary-font font-semibold rounded bg-gray-200 focus:outline-none"
                    placeholder={`Ingredient ${index + 1}`}
                    required
                  />
                  {recipeData.ingredient.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="px-3 text-red-600 font-bold"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="mt-2 px-4 py-1 secondary-font font-semibold bg-green-600 text-white rounded"
              >
                + Add Ingredient
              </button>
            </div>
            <div>
              <label className="font-semibold secondary-font mb-1">Steps</label>
              {recipeData.steps.map((step, index) => (
                <div key={index} className="flex gap-2 my-2">
                  <textarea
                    value={step}
                    onChange={(e) => handleStepsChange(index, e.target.value)}
                    className="w-full p-2 secondary-font font-semibold rounded bg-gray-200 focus:outline-none"
                    placeholder={`Step ${index + 1}`}
                    required
                  />
                  {recipeData.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSteps(index)}
                      className="px-3 text-red-600 font-black"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSteps}
                className="mt-2 px-4 py-1 bg-blue-600 secondary-font font-semibold text-white rounded "
              >
                + Add Steps
              </button>
            </div>
            <div>
              <label className="font-semibold secondary-font mb-1">
                Cooking Time
              </label>
              <input
                type="text"
                name="cookingTime"
                value={recipeData.cookingTime}
                onChange={handleChange}
                className="w-full p-2 rounded secondary-font bg-gray-200 font-semibold focus:outline-none"
                placeholder="Cooking Time"
                required
              />
            </div>
            <div>
              <label className="font-semibold secondary-font mb-1">
                Dish Image
              </label>
              <input
                type="file"
                accept="image/**"
                onChange={(e) =>
                  setRecipeData((prev) => ({
                    ...prev,
                    img: e.target.files[0], //storing file object
                  }))
                }
                className="w-full p-2 rounded secondary-font bg-gray-200 font-semibold text-gray-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-800 text-white p-3 rounded-xl text-lg font-semibold aecondary-font"
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
