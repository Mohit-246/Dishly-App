import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user")); // Profile of LoggedIn User
  const [profile, setProfile] = useState(null); // Profile of Recipe Owner
  const [allUser, setAllUsers] = useState(); // All The Users (Only for Admin Dashboard)
  const [recipes, setRecipes] = useState([]); // All Recipes
  const [recipe, setRecipe] = useState(null); // Single Recipes
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth Status
  const [loading, setLoading] = useState(false); // Global Loading State
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  //Get All recipes
  const getAllRecipe = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/v4/recipe/all`);

      if (!data.success) {
        return toast.info(data.message);
      }
      setRecipes(data.recipes);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    console.log(localStorage.getItem("user"));

    console.log(user);
  }, [user]);

  useEffect(() => {
    getAllRecipe();
  }, []);

  // Auto-check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    setUser,
    profile,
    setProfile,
    allUser,
    setAllUsers,
    recipes,
    setRecipes,
    recipe,
    setRecipe,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    setLoading,
    BACKEND_URL,
    logout,
    getAllRecipe,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
