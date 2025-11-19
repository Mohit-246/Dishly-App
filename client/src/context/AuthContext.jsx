import { createContext, useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ---------- GLOBAL STATES ----------
  const [user, setUser] = useState(null);         // logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);   // <-- prevents null flashing
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);  // renamed for consistency
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);

  // -----------------------------------------------------
  // FETCH LOGGED-IN USER (RESTORES LOGIN ON REFRESH)
  // -----------------------------------------------------
  const fetchLoggedInUser = async () => {
    try {
      const res = await axiosInstance.get("/v4/auth/me");

      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Auth error:", error.response?.data?.message);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setAuthReady(true); // <--- IMPORTANT!
    }
  };

  // Run once on first load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchLoggedInUser();
    } else {
      setAuthReady(true); // no token but still ready
    }
  }, []);


  // -----------------------------------------------------
  // GET ALL RECIPES
  // -----------------------------------------------------
  const getAllRecipe = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/v4/recipe/all`);

      if (!data.success) return toast.info(data.message);

      setRecipes(data.recipes);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllRecipe();
  }, []);


  // -----------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };


  // -----------------------------------------------------
  // PROVIDER VALUE
  // -----------------------------------------------------
  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    authReady,
    loading,
    setLoading,

    // recipe context
    recipes,
    setRecipes,
    recipe,
    setRecipe,

    // users
    profile,
    setProfile,
    allUsers,
    setAllUsers,

    logout,
    getAllRecipe,
  };

  // -----------------------------------------------------
  // BLOCK RENDERING UNTIL authReady = true
  // -----------------------------------------------------
  if (!authReady) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
