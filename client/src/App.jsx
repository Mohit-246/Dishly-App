import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="w-screen bg-emerald-50/20">
        <ToastContainer />
        <Navbar />
        <main className="h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
