import React, { useContext, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false); //mobile menu toogle
  const inputRef = useRef(null);

  const location = useLocation();

  const shouldHide =
    location.pathname === "/login" || location.pathname === "/register";

  // 🔵 Center-Origin Underline Animation
  const linkClasses = ({ isActive }) =>
    `relative px-1 py-2
     after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
     after:bottom-1 after:w-0 after:h-0.5 after:bg-emerald-600
     after:transition-all after:duration-300 hover:after:w-full
     ${isActive ? "after:w-full after:bg-blue-600 " : ""}`;


  return (
    <nav className="w-full shadow-md flex items-center justify-evenly px-6 md:px-10 h-20">
      {/* LOGO */}
      <img src={logo} alt="" className="w-32" />

      {/* DESKTOP VIEW —––––––––––––––––––––––––––––––––––––––––––––– */}
      {!shouldHide ? (
        <>
          {!isLoggedIn ? (
            /* BEFORE LOGIN */
            <div className="hidden md:flex items-center gap-8 grow">
              {/* SEARCH BOX */}
              <div className="grow flex justify-center">
                <div className="relative w-2/3 bg-slate-100 rounded-full">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="rounded-full px-12 py-2 w-2/3 focus:outline-none font-semibold"
                  />
                  <svg
                    className="absolute left-[89%] top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    onClick={() => inputRef.current.focus()}
                  >
                    <path d="M21 21l-4.35-4.35M10 4a6 6 0 016 6 6 6 0 11-6-6z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <NavLink to="/login">
                  <button className="px-4 py-2 border-2 border-white bg-emerald-400 text-white primary-font font-bold rounded-lg transform duration-200 hover:scale-110">
                    Login
                  </button>
                </NavLink>

                <NavLink to="/register">
                  <button className="px-4 py-2 border-2 border-emerald-400 text-emerald-600 primary-font font-bold rounded-lg transform duration-200 hover:scale-110">
                    Register
                  </button>
                </NavLink>
              </div>
            </div>
          ) : (
            /* AFTER LOGIN */
            <div className="hidden md:flex items-center gap-8 grow">
              {/* NAVIGATION */}
              <ul className="flex items-center gap-6  text-md primary-font px-6 py-2 rounded-md">
                <NavLink to="/" className={linkClasses}>
                  Home
                </NavLink>

                <NavLink to="/explore" className={linkClasses}>
                  Explore
                </NavLink>

                <NavLink to="/reviews" className={linkClasses}>
                  Reviews
                </NavLink>
              </ul>

              {/* SEARCH WITH SVG */}
              <div className="grow flex justify-center">
                <div className="relative w-2/3 bg-slate-100 rounded-full">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="rounded-full px-12 py-2 w-2/3 focus:outline-none font-semibold"
                  />
                  <svg
                    className="absolute left-[89%] top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    onClick={() => inputRef.current.focus()}
                  >
                    <path d="M21 21l-4.35-4.35M10 4a6 6 0 016 6 6 6 0 11-6-6z" />
                  </svg>
                </div>
              </div>

              {/* CREATE BUTTON */}
              <NavLink to="/create">
                <button className="px-4 py-2  bg-emerald-400 text-white text-shadow-2xs primary-font font-bold rounded-lg transform duration-200 hover:scale-110">
                  Add
                </button>
              </NavLink>

              {/* PROFILE ICON */}
              <NavLink to="/profile">
                <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center font-bold cursor-pointer">
                  A
                </div>
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <>
          <button className="px-4 py-2 border-2 border-emerald-400 text-emerald-600 primary-font font-bold rounded-lg transform duration-200 hover:scale-110">
            <NavLink to="/">Go to Homepage</NavLink>
          </button>
        </>
      )}

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden border-2 border-black px-3 py-1 rounded-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* MOBILE MENU DROPDOWN —–––––––––––––––––––––––––––––––––– */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-300 p-6 flex flex-col gap-5 md:hidden z-50">
          {/* SEARCH MOBILE */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-black rounded-full px-12 py-2 w-full"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 21l-4.35-4.35M10 4a6 6 0 016 6 6 6 0 11-6-6z" />
            </svg>
          </div>
          {/* BEFORE LOGIN (MOBILE) */}
          {!isLoggedIn && (
            <>
              <NavLink to="/login">
                <button className="w-full px-4 py-2 border-2 border-black rounded-lg">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="w-full px-4 py-2 border-2 border-black rounded-lg">
                  Register
                </button>
              </NavLink>
            </>
          )}

          {/* AFTER LOGIN (MOBILE) */}
          {isLoggedIn && (
            <>
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
              <NavLink to="/explore" className={linkClasses}>
                Explore
              </NavLink>

              <NavLink to="/reviews" className={linkClasses}>
                Reviews
              </NavLink>

              <NavLink to="/create">
                <button className="w-full px-4 py-2 border-2 border-black rounded-lg">
                  Create
                </button>
              </NavLink>

              <NavLink to="/profile">
                <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center font-bold">
                  A
                </div>
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
