import { useContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Loader from "./components/Loader.jsx";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext.jsx";
import useUserHooks from "../src/hooks/useUserHooks.js";

function App() {
  const {authReady, setAuthReady } = useContext(AuthContext);
  const { getLoggedInUser } = useUserHooks();
  const location = useLocation();

  const shouldHide =
    location.pathname === "/login" || location.pathname === "/register";

  // Run once on first load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getLoggedInUser();
    } else {
      setAuthReady(true); // no token but still ready
    }
  }, []);
   // BLOCK RENDERING UNTIL authReady = true
  if (!authReady) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ToastContainer />
        <Navbar />
        <main>
          <Outlet />
        </main>
        {!shouldHide && <Footer />}
      </div>
    </>
  );
}

export default App;
