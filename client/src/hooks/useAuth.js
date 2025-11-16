import { useContext } from "react";
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
    localStorage.setItem("user", res.newUser);
    
    navigate("/");
    toast.success(res.message);
    setIsLoggedIn(true);
    setUser(res.newUser);
  };
  
  const login = async (formData) => {
    const res = await post("/v4/auth/login", formData);
    
    if (!res?.success) return;
    
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", res.user);

    toast.success(res.message);
    navigate("/");
    setIsLoggedIn(true);
    setUser(res.user);
  };

  const getAllUsers = async () => {
    const res = await get("/v4/auth/me");

    if (!res?.success) return;

    setAllUser(res.users);
    toast.success(res.message);
  };

  return { register, login, getAllUsers };
}
