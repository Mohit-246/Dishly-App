import React, { useState } from "react";
import { Lock, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { toast } from "react-toastify";
export default function Register() {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: File,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim()) {
      toast.error("Please enter both Username and Email");
      return;
    }
    const userDataToSend = new FormData();

    userDataToSend.append("name", formData.name);
    userDataToSend.append("email", formData.email);
    userDataToSend.append("password", formData.password);
    userDataToSend.append("username", formData.username);
    userDataToSend.append("image", formData.image);

    register(formData);
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      image: File,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen -z-50 bg-linear-to-br from-green-600 via-green-200 to-green-400">
        <div className="max-w-min bg-gray-100 rounded-4xl px-6 py-8 shadow-2xl">
          <div className="w-full text-center space-y-1">
            <h2 className="text-4xl primary-font font-bold text-emerald-600">
              Register
            </h2>
            <h3 className="text-md secondary-font font-semibold text-gray-600">
              Join Dishly Today!!
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
            <div className="w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <User size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="username"
                onChange={handleChange}
                className="text-md font-semibold secondary-font focus:outline-none"
                required
              />
            </div>
            <div className="w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <User size={20} />
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="name"
                onChange={handleChange}
                className="text-md font-semibold secondary-font focus:outline-none"
                required
              />
            </div>
            <div className="w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <User size={20} />
              <input
                type="text"
                name="email"
                value={formData.email}
                placeholder="email or username"
                onChange={handleChange}
                className="text-md font-semibold secondary-font focus:outline-none"
                required
              />
            </div>
            <div className="w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <Lock size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="text-md font-semibold secondary-font focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold secondary-font mb-1">
                Upload Avatar
              </label>
              <input
                type="file"
                accept="image/**"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    img: e.target.files[0], //storing file object
                  }))
                }
                className="w-full p-2 rounded secondary-font bg-gray-200 font-semibold text-gray-500 focus:outline-none"
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="submit"
                className="text-lg secondary-font font-black py-2 px-4 rounded-full text-white bg-emerald-400 "
              >
                Register
              </button>
              <button
                type="reset"
                className="text-lg secondary-font font-black py-2 px-4 rounded-full bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="text-center para-font text-sm">
            <h2>
              Aleady have Account ?&nbsp;
              <span className="hover:text-sky-600 font-semibold">
                <NavLink to="/login">Login</NavLink>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
