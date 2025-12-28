import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Meals from "../pages/meals/Meals";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import UserMyOrders from "../pages/dashboard/user/myOrders/UserMyOrders";
import UserMyReview from "../pages/dashboard/user/myReview/UserMyReview";
import ChefMyMeals from "../pages/dashboard/chef/myMeals/ChefMyMeals";
import ChefCreateMeal from "../pages/dashboard/chef/createMeal/ChefCreateMeal";
import ChefOrderRequests from "../pages/dashboard/chef/orderRequests/ChefOrderRequests";
import AdminManageUser from "../pages/dashboard/admin/manageUser/AdminManageUser";
import AdminManageRequest from "../pages/dashboard/admin/manageRequest/AdminManageRequest";
import AdminPlatformStatistics from "../pages/dashboard/admin/platformStatistics/AdminPlatformStatistics";
import MealDetails from "../pages/mealDetails/MealDetails";
import OrderForm from "../pages/orderPage/OrderForm";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import MyProfile from "../pages/dashboard/my-profile/MyProfile";
import AdminRouter from "./AdminRouter";
import ErrorPages from "../pages/error/ErrorPages";
import ChefRouter from "./ChefRouter";
import UserFavoriteMeal from "../pages/dashboard/user/favoriteMeal/UserFavoriteMeal";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPages></ErrorPages>,
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
        element: (
          <PrivateRouter>
            <MealDetails></MealDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "order-form/:id",
        element: (
          <PrivateRouter>
            <OrderForm></OrderForm>
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
    errorElement: <ErrorPages></ErrorPages>,
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },
      // user dashboard
      {
        path: "dashboard/user-orders",
        element: (
          <PrivateRouter>
            <UserMyOrders></UserMyOrders>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/user-review",
        element: (
          <PrivateRouter>
            <UserMyReview></UserMyReview>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/user-favoriteMeal",
        element: (
          <PrivateRouter>
            <UserFavoriteMeal></UserFavoriteMeal>
          </PrivateRouter>
        ),
      },
      // chef dasboard

      {
        path: "dashboard/chef-createMeal",
        element: (
          <PrivateRouter>
            <ChefRouter>
              <ChefCreateMeal></ChefCreateMeal>
            </ChefRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/chef-myMeals",
        element: (
          <PrivateRouter>
            <ChefRouter>
              <ChefMyMeals></ChefMyMeals>
            </ChefRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/chef-orderRequest",
        element: (
          <PrivateRouter>
            <ChefRouter>
              <ChefOrderRequests></ChefOrderRequests>
            </ChefRouter>
          </PrivateRouter>
        ),
      },
      // admin dashboard

      {
        path: "dashboard/admin-manageUser",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AdminManageUser></AdminManageUser>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/admin-manageRequest",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AdminManageRequest></AdminManageRequest>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "dashboard/admin-PlatformStatistics",
        element: (
          <PrivateRouter>
            <AdminRouter>
              <AdminPlatformStatistics></AdminPlatformStatistics>
            </AdminRouter>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
