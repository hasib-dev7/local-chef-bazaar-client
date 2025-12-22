import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Meals from "../pages/meals/Meals";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import UserMyProfile from "../pages/dashboard/user/myProfile/UserMyProfile";
import UserMyOrders from "../pages/dashboard/user/myOrders/UserMyOrders";
import UserMyReview from "../pages/dashboard/user/myReview/UserMyReview";
import UserFavoriteMeal from "../pages/dashboard/user/favoriteMeal/UserFavoriteMeal";
import ChefMyProfile from "../pages/dashboard/chef/myProfile/ChefMyProfile";
import ChefMyMeals from "../pages/dashboard/chef/myMeals/ChefMyMeals";
import ChefCreateMeal from "../pages/dashboard/chef/createMeal/ChefCreateMeal";
import ChefOrderRequests from "../pages/dashboard/chef/orderRequests/ChefOrderRequests";
import AdminMyProfile from "../pages/dashboard/admin/myProfile/AdminMyProfile";
import AdminManageUser from "../pages/dashboard/admin/manageUser/AdminManageUser";
import AdminManageRequest from "../pages/dashboard/admin/manageRequest/AdminManageRequest";
import AdminPlatformStatistics from "../pages/dashboard/admin/platformStatistics/AdminPlatformStatistics";
import MealDetails from "../pages/mealDetails/MealDetails";
import OrderForm from "../pages/orderPage/OrderForm";
import PaymentSuccess from "../pages/payment/PaymentSuccess";

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
        element: <Meals></Meals>,
      },
      {
        path: "meal-details/:id",
        element: <MealDetails></MealDetails>,
      },
      {
        path: "order-form/:id",
        element: <OrderForm></OrderForm>,
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
      // payment pages
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
    ],
  },
  // dashboard layout
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      // user dashboard
      {
        path: "dashboard/user-profile",
        element: <UserMyProfile></UserMyProfile>,
      },
      {
        path: "dashboard/user-orders",
        element: <UserMyOrders></UserMyOrders>,
      },
      {
        path: "dashboard/user-review",
        element: <UserMyReview></UserMyReview>,
      },
      {
        path: "dashboard/user-favoriteMeal",
        element: <UserFavoriteMeal></UserFavoriteMeal>,
      },
      // chef dasboard
      {
        path: "dashboard/chef-profile",
        element: <ChefMyProfile></ChefMyProfile>,
      },
      {
        path: "dashboard/chef-createMeal",
        element: <ChefCreateMeal></ChefCreateMeal>,
      },
      {
        path: "dashboard/chef-myMeals",
        element: <ChefMyMeals></ChefMyMeals>,
      },
      {
        path: "dashboard/chef-orderRequest",
        element: <ChefOrderRequests></ChefOrderRequests>,
      },
      // admin dashboard
      {
        path: "dashboard/admin-profile",
        element: <AdminMyProfile></AdminMyProfile>,
      },
      {
        path: "dashboard/admin-manageUser",
        element: <AdminManageUser></AdminManageUser>,
      },
      {
        path: "dashboard/admin-manageRequest",
        element: <AdminManageRequest></AdminManageRequest>,
      },
      {
        path: "dashboard/admin-PlatformStatistics",
        element: <AdminPlatformStatistics></AdminPlatformStatistics>,
      },
    ],
  },
]);
