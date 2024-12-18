import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import ErrorPage from "./components/Error-page/ErrorPage.jsx";
import Login from "./components/Student/Login/Login.jsx";
import TeacherLogin from "./components/Teacher/Login/TeacherLogin.jsx";
import Register from "./components/Student/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import TeacherRegister from "./components/Teacher/Register/TeacherRegister.jsx";
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
        path: "student/login",
        element: <Login />,
      },
      {
        path: "student/register",
        element: <Register />,
      },
      {
        path: "teacher/login",
        element: <TeacherLogin />,
      },
      {
        path: "teacher/register",
        element: <TeacherRegister />,
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
