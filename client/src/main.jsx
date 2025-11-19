import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import Profile from "./pages/Profile.jsx";
import SavedRecipe from "./pages/SavedRecipe.jsx";
import ExploreRecipe from "./pages/ExploreRecipe.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <CreateRecipe />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/saved",
        element: <SavedRecipe />,
      },
      {
        path: "/explore",
        element: <ExploreRecipe />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={routes} />
  </AuthContextProvider>
);
