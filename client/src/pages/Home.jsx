import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import img1 from "../assets/home-cooking.png";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="mt-20 px-8">
        <div className="flex flex-col md:flex-row  items-center justify-evenly">
          <div className="px-8 py-4 space-y-3">
            <div className="text-4xl font-extrabold primary-font text-emerald-600">
              <h1>Your Kitchen Adventure Starts NOW</h1>
              <h1>Cook Delecious</h1>
            </div>
            <div className="text-lg text-gray-600 para-font">
              <p>
                Discover irresistible recipes, create your own masterpieces, and
                spark joy with every bite.
              </p>
              <p>Ready to explore deliciousness?</p>
            </div>
            <div className="flex items-center gap-6 px-2 py-4 text-md font-semibold secondary-font">
              <NavLink to="/explore">
                <button className="px-4 py-2 bg-emerald-400 text-white text-shadow-2xs rounded-full transform duration-200 hover:scale-110">
                  Let's Get Cooking!
                </button>
              </NavLink>
              {isLoggedIn ? (
                <NavLink to="/create">
                  <button className="px-4 py-2 border-2 border-emerald-400 text-shadow-2xs rounded-full transform duration-200 hover:scale-110">
                    Create One!
                  </button>
                </NavLink>
              ) : (
                <NavLink to="/register">
                  <button className="px-4 py-2 border-2 border-emerald-400 text-shadow-2xs rounded-full transform duration-200 hover:scale-110">
                    Join Dishly Today !!
                  </button>
                </NavLink>
              )}
            </div>
          </div>
          <div className="px-8 py-4" title="Dishly">
            <img src={img1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
