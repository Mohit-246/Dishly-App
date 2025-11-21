import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ---------- GLOBAL STATES ----------
  const [user, setUser] = useState(null); // logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false); // <-- prevents null flashing
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(null);
  const [allUsers, setAllUsers] = useState([]); // renamed for consistency
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  // PROVIDER VALUE

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    authReady,
    setAuthReady,
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
