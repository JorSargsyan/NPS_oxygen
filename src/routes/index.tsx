import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";

export const createRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
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
