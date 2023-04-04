import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";
import { useSelector } from "react-redux";
import { selectAuth } from "store/slicers/auth";
import { useCallback, useEffect, useMemo } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  GetConfig,
  GetPermissions,
  selectPermissions,
} from "store/slicers/common";
import { GetCurrentUser } from "store/slicers/users";
import AccountPage from "pages/dashboard/Account";
import { GetTranslationsByLangId } from "store/slicers/translations";
import { LStorage } from "store/config/constants";
import FeedbackDetails from "pages/dashboard/FeedBacks/components/FeedbackDetails";
import CampaignDetails from "pages/dashboard/CampaignDetails";
import usePermission from "shared/helpers/hooks/usePermission";
import {
  ECampaignPermissions,
  ECustomersPermissions,
  EDirectoratePermissions,
  EFeedbackPermissions,
  ERolesPermissions,
  ETranslationPermissions,
  EUserPermissions,
} from "resources/permissions/permissions.enum";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export const CreateRoutes = () => {
  const dispatch = useAsyncDispatch();
  const isAuthorized = useSelector(selectAuth);
  const hasCustomerPerm = usePermission(ECustomersPermissions.Read);
  const hasRolesPerm = usePermission(ERolesPermissions.Read);
  const hasUsersPerm = usePermission(EUserPermissions.Read);
  const hasTranslationPerm = usePermission(ETranslationPermissions.Read);
  const hasDirectoratePerm = usePermission(EDirectoratePermissions.Read);
  const hasFeedbackPerm = usePermission(EFeedbackPermissions.Read);
  const hasCampaignPerm = usePermission(ECampaignPermissions.Read);
  const permList = useSelector(selectPermissions);

  const hasGridViewFeedbackCardPermission = usePermission(
    EFeedbackPermissions.View_feedback_card
  );

  const hasPerm = useMemo(() => {
    return {
      hasCustomerPerm,
      hasRolesPerm,
      hasUsersPerm,
      hasTranslationPerm,
      hasDirectoratePerm,
      hasFeedbackPerm,
      hasCampaignPerm,
    };
  }, [
    hasCustomerPerm,
    hasRolesPerm,
    hasUsersPerm,
    hasTranslationPerm,
    hasDirectoratePerm,
    hasFeedbackPerm,
    hasCampaignPerm,
  ]);

  const routesList = items(hasPerm);

  const fetchDashboardData = useCallback(() => {
    const activeLang = Number(localStorage.getItem(LStorage.LANG));
    Promise.all([
      dispatch(GetCurrentUser()),
      dispatch(GetConfig()),
      dispatch(GetPermissions()),
      dispatch(GetTranslationsByLangId(activeLang)),
    ]);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized && Number(localStorage.getItem(LStorage.LANG))) {
      fetchDashboardData();
    }
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
    // ...(!permList
    //   ? [
    //       {
    //         path: "*",
    //         element: (
    //           <Box
    //             sx={{
    //               display: "flex",
    //               height: "100vh",
    //               alignItems: "center",
    //               justifyContent: "center",
    //             }}
    //           >
    //             <CircularProgress />
    //           </Box>
    //         ),
    //       },
    //     ]
    //   : [
    {
      path: "/",
      element: isAuthorized ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        ...routesList.map((item) => {
          if (item?.children?.length) {
            return {
              path: item.path,
              element: item.element,
              children: [
                ...item.children.map((child) => {
                  return {
                    path: child.path,
                    element: child.element,
                  };
                }),
              ],
            };
          } else {
            return {
              path: item.path,
              element: item.element,
            };
          }
        }),
        {
          path: "profile",
          element: <AccountPage />,
        },
        ...(hasGridViewFeedbackCardPermission
          ? [
              {
                path: "response/:id",
                element: <FeedbackDetails />,
              },
            ]
          : []),

        {
          path: "campaign/:id",
          element: <CampaignDetails />,
        },
      ],
    },
    // ]),
  ]);

  return router;
};
