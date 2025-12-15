import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Meals from "../pages/meals/Meals";
import PrivateRouter from "./PrivateRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "meals",
        element: (
          <PrivateRouter>
            <Meals></Meals>
          </PrivateRouter>
        ),
      },
      // login and register pages
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
