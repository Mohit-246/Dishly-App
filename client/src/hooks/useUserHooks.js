import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

export default function useUserHooks() {
  const { setProfile, setUser, logout } = useContext(AuthContext);
  const { get, put, del } = useApi();

  const getUser = async (id) => {
    const res = await get(`/users/${id}`);

    if (!res?.success) return;

    setUser(res.user);
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
    updateUser,
    deleteUser,
  };
}
