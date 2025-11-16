import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "./useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useRecipeHooks() {
  const { setRecipe, isLoggedIn } =
    useContext(AuthContext);
  const { post, get, put, del } = useApi();
  const navigate = useNavigate();

  const createRecipe = async (formData) => {
    if (!isLoggedIn) {
      toast.error("Register or Login to Add Yor Recipe");
      navigate("/signup");
      return;
    }

    const res = await post("/v4/recipe/create", formData);
    if (!res?.success) return;

    toast.success(res.message);
    navigate("/");
  };

  const getRecipe = async (id) => {
    const res = await get(`/v4/recipe/${id}`);

    if (!res?.success) return;

    setRecipe(res.recipe);
  };

  const likeRecipe = async (id) => {
    const res = await post(`/v4/recipe/like/${id}`);
    if (!res?.success) return;

    toast.success("Recipe Liked");
    return res;
  };

  const updateRecipe = async (id, data) => {
    const res = await put(`/v4/recipe/${id}`, data);

    if (!res?.success) return;

    toast.success("Recipe Updated SuccessFully");
    navigate("/");
  };

  const deleteRecipe = async (id) => {
    const res = await del(`/v4/recipe/${id}`);

    if (!res?.success) return;
    toast.success("Recipe Deleted SuccessFully");
    navigate("/");
  };
  return {
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
  };
}
