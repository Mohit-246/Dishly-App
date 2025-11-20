import { Instagram, Youtube, Facebook } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="w-full bottom-0 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <img src={logo} alt="" className="w-28" />
          <p className="text-gray-600 text-sm para-font mt-2">
            Your favorite place to cook, share, and discover delicious recipes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg primary-font font-bold mb-3 text-gray-800">
            Quick Links
          </h4>
          <ul className="space-y-2 secondary-font font-semibold text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-green-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className="hover:text-green-600">
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className="hover:text-green-600">
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="hover:text-green-600">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-800">
            Follow Us
          </h4>
          <div className="flex space-x-5 text-gray-700">
            <NavLink to="#" className="hover:text-green-600">
              <Instagram className="w-6 h-6" />
            </NavLink>
            <NavLink to="#" className="hover:text-green-600">
              <Youtube className="w-6 h-6" />
            </NavLink>
            <NavLink to="#" className="hover:text-green-600">
              <Facebook className="w-6 h-6" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Dishly — All Rights Reserved.
      </div>
    </footer>
  );
}
