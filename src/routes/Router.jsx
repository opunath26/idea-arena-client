import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Creator from "../pages/Creator/Creator";
import AddContest from "../pages/AddContest/AddContest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'creator',
        element: <PrivateRoute><Creator></Creator></PrivateRoute>
      },
      {
        path: 'add-contest',
        element: <PrivateRoute><AddContest></AddContest></PrivateRoute>,
        loader: () => fetch('/addContest.json').then(res => res.json())
      }
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);