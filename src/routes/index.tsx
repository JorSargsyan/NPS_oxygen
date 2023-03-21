import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";
import { useSelector } from "react-redux";
import { selectAuth } from "store/slicers/auth";
import { useCallback, useEffect } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { GetConfig, GetPermissions } from "store/slicers/common";
import { GetCurrentUser } from "store/slicers/users";
import AccountPage from "pages/dashboard/Account";

export const CreateRoutes = () => {
  const dispatch = useAsyncDispatch();
  const isAuthorized = useSelector(selectAuth);

  const fetchDashboardData = useCallback(() => {
    console.log("fetching dashboard info");
    Promise.all([
      dispatch(GetCurrentUser()),
      dispatch(GetConfig()),
      dispatch(GetPermissions()),
    ]);
  }, [dispatch]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData, isAuthorized]);

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
      children: [
        ...items.map((item) => {
          return {
            path: item.path,
            element: item.element,
          };
        }),
        {
          path: "profile",
          element: <AccountPage />,
        },
      ],
    },
  ]);

  return router;
};
