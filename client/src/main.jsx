import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import Profile from "./pages/Profile.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import ExploreRecipe from "./pages/ExploreRecipe.jsx";
import Register from "./pages/Register.jsx";
import AuthorProfilePage from "./pages/AuthorProfilePage.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

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
        path: "/recipe/:slug/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/explore",
        element: <ExploreRecipe />,
      },
      {
        path: "/recipe/author/:slug/:id",
        element: <AuthorProfilePage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={routes} />
  </AuthContextProvider>
);
