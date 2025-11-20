import React from "react";

export default function Loader() {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    </>
  );
}
