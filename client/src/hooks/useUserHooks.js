import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

export default function useUserHooks() {
  const { setProfile, setUser, logout, setIsLoggedIn, setAuthReady, setAllUsers } =
    useContext(AuthContext);
  const { get, put, del } = useApi();

  const getUser = async (id) => {
    const res = await get(`/users/${id}`);

    if (!res?.success) return;

    setUser(res.user);
  };

  // FETCH LOGGED-IN USER (RESTORES LOGIN ON REFRESH)

  const getLoggedInUser = async () => {
    const res = await get("/v4/auth/me");

    setUser(res.user);
    setIsLoggedIn(true);
    setAuthReady(true);
    if (!res.success) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };
  const getAllUsers = async () => {
    const res = await get("/v4/auth/admin");

    setAllUsers(res.users);
    setIsLoggedIn(true);
    if (!res.success) {
      setAllUsers(null);
      setIsLoggedIn(false);
    }
  };

  const updateUser = async (id, data) => {
    const res = await put(`/users/${id}`, data);

    if (!res?.success) return;

    toast.success(res.message);
    setProfile(res.user);
    return res.user;
  };

  const deleteUser = async (id) => {
    const res = await del(`/users/${id}`);

    if (!res?.success) return;

    toast.success(res.message);
    logout(); // log out the user after deletion
  };
  return {
    getUser,
    getLoggedInUser,
    updateUser,
    deleteUser,
    getAllUsers,
  };
}
