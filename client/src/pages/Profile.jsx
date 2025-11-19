import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Top Banner */}
      <div
        className="w-full h-48 md:h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${user.avatar})` }}
      ></div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-4 -mt-16">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-3xl primary-font font-extrabold flex items-center gap-2">
            {user.name} <span className="text-blue-600 text-xl">●</span>
          </h1>
          <p className="secondary-font font-semibold text-gray-700">
            @{user.username}
          </p>
          <p className="para-font text-gray-500 mt-1">Di</p>
        </div>

        {/* About */}
        <p className="mt-4 para-font text-gray-700 max-w-2xl">
          {user.description}
        </p>

        {/* Profile Details */}
        <div className="mt-6 secondary-font font-medium items-center bg-white shadow p-6 rounded-xl space-y-3">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Password:</span> {"•".repeat(8)}
          </p>
        </div>
        <NavLink to={`/profile/@${user.username}/edit`}>
          <button className="mt-6 px-6 py-2 secondary-font font-semibold bg-emerald-600 text-white rounded-xl transform duration-200 hover:scale-110">
            {" "}
            Edit Profile
          </button>
        </NavLink>
      </div>
    </div>
  );
}
