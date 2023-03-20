import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import HomePage from "pages/dashboard/Home";
import DashboardLayout from "layout/Dashboard";
import Feedbacks from "pages/dashboard/FeedBacks";
import Campaigns from "pages/dashboard/Campaigns";
import Customers from "pages/dashboard/Customers";
import Roles from "pages/dashboard/Roles";
import Users from "pages/dashboard/Users";
import Dictionary from "pages/dashboard/Dictionary";
import { items } from "layout/Dashboard/config";

export const createRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/overview" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: items.map((item) => {
        return {
          path: item.path,
          element: item.element,
        };
      }),
    },
  ]);

  return router;
};
