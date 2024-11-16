import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import ErrorPage from "./components/Error-page/ErrorPage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";

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
        path: "student/login",
        element: <Login />,
      },
      {
        path: "student/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
