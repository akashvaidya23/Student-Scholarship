import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import ErrorPage from "./components/Error-page/ErrorPage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import AdminLogin from "./components/Admin/Login/AdminLogin.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import CheckIfAuth from "./components/CheckIsAuth.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/dashboard",
        element: (
          <CheckIfAuth>
            <Dashboard />
          </CheckIfAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
