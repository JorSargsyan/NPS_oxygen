import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";
import { useSelector } from "react-redux";
import { selectAuth } from "store/slicers/auth";

export const CreateRoutes = () => {
  const isAuthorized = useSelector(selectAuth);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={isAuthorized ? "/overview" : "/login"} />,
    },

    {
      path: "/login",
      element: isAuthorized ? <Navigate to="/overview" replace /> : <Login />,
    },

    {
      path: "/",
      element: isAuthorized ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />
      ),
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
