import React, { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.identifier.trim()) {
      toast.error("Please enter Username or Email");
      return;
    }
    login(formData);
    setFormData({
      identifier: "",
      password: "",
    });
  };
  return (
    <>
      <div className="mt-20 flex items-center justify-center h-screen -z-50 bg-linear-to-br from-green-600 via-green-200 to-green-400">
        <div className="max-w-min bg-gray-100 rounded-4xl px-6 py-8 shadow-2xl">
          <div className="w-full text-center">
            <h2 className="text-4xl primary-font font-bold text-emerald-600">
              Login
            </h2>
            <h3 className="text-md secondary-font font-semibold text-gray-600">
              Welcome Back to Dishly!!
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-6 space-y-4">
            <div className="w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <User size={20} />
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                placeholder="email or username"
                onChange={handleChange}
                className="text-md font-semibold secondary-font focus:outline-none"
              />
            </div>
            <div className="relative w-full flex items-center rounded-full gap-2 px-4 py-3 bg-gray-300">
              <Lock size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="text-md font-semibold secondary-font focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="submit"
                className="text-lg secondary-font font-black py-2 px-4 rounded-full text-white bg-emerald-400 "
              >
                Login
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
              Doesnn't Have an Account?&nbsp;
              <span className="hover:text-sky-600 font-semibold">
                <NavLink to="/register">Register</NavLink>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
