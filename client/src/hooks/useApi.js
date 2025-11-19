import { useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export const useApi = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const get = async (url) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      toast.error(error.message || "Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(url, data);
      return res.data;
    } catch (error) {
      console.log(error.message);

      toast.error(error.message || "Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const put = async (url, data) => {
    try {
      setLoading(false);
      const res = await axiosInstance.put(url, data);
      return res.data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const del = async (url) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(url);
      return res.data;
    } catch (error) {
      toast.error(error.message || "Delete failed!");
    } finally {
      setLoading(false);
    }
  };

  return { get, post, loading, put, del };
};
