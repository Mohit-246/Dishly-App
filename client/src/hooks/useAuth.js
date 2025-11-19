import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "./useApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { setIsLoggedIn, setUser, setAllUser } = useContext(AuthContext);
  const { get, post } = useApi();
  const navigate = useNavigate();

  const register = async (formData) => {
    const res = await post("/v4/auth/register", formData);

    if (!res?.success) return;

    localStorage.setItem("token", res.token);

    setIsLoggedIn(true);
    setUser(res.user || res.newUser); // normalized

    toast.success(res.message || "Registration Successfull");
    navigate("/");
  };

  const login = async (formData) => {
    const res = await post("/v4/auth/login", formData);

    if (!res?.success) return;

    localStorage.setItem("token", res.token);

    setIsLoggedIn(true);
    setUser(res.user);

    toast.success(res.message || "Login Sucessfull");
    navigate("/");
  };

  const getAllUsers = async () => {
    const res = await get("/v4/auth/admin");

    if (!res?.success) return;

    setAllUser(res.users);
    toast.success(res.message || "All user Fetched");
  };

  return { register, login, getAllUsers };
}
