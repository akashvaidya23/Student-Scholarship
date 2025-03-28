// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import ErrorPage from "./components/Error-page/ErrorPage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import CheckIfAuth from "./components/CheckIsAuth.jsx";
import "./App.css";
import List from "./components/List/List.jsx";
import Create from "./components/Create/Create.jsx";
import Edit from "./components/Edit/Edit.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

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
        path: "create",
        element: <Create />,
      },
      {
        path: "/students",
        element: (
          <CheckIfAuth>
            <List type="student" />
          </CheckIfAuth>
        ),
        children: [
          {
            path: "edit/:id",
            element: <Edit />,
          },
        ],
      },
      {
        path: "/teachers",
        element: (
          <CheckIfAuth>
            <List type="scholarship officer" />
          </CheckIfAuth>
        ),
        children: [
          {
            path: "edit/:id",
            element: <Edit />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <CheckIfAuth>
            <Dashboard />
          </CheckIfAuth>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
