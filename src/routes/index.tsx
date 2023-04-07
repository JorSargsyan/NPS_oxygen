import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";
import AccountPage from "pages/dashboard/Account";
import CampaignDetails from "pages/dashboard/CampaignDetails";
import FeedbackDetails from "pages/dashboard/FeedBacks/components/FeedbackDetails";
import SurveyPreview from "pages/Survey";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  ECampaignPermissions,
  ECustomersPermissions,
  EDirectoratePermissions,
  EFeedbackPermissions,
  ERolesPermissions,
  ETranslationPermissions,
  EUserPermissions,
} from "resources/permissions/permissions.enum";
import usePermission from "shared/helpers/hooks/usePermission";
import { selectAuth } from "store/slicers/auth";
import Login from "../pages/auth/login";

export const CreateRoutes = () => {
  const isAuthorized = useSelector(selectAuth);
  const hasCustomerPerm = usePermission(ECustomersPermissions.Read);
  const hasRolesPerm = usePermission(ERolesPermissions.Read);
  const hasUsersPerm = usePermission(EUserPermissions.Read);
  const hasTranslationPerm = usePermission(ETranslationPermissions.Read);
  const hasDirectoratePerm = usePermission(EDirectoratePermissions.Read);
  const hasFeedbackPerm = usePermission(EFeedbackPermissions.Read);
  const hasCampaignPerm = usePermission(ECampaignPermissions.Read);

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

  const getDashboardRoutes = () => {
    const getChildRoutes = (item) => {
      if (item?.children?.length) {
        return {
          path: item.path,
          element: item.element,
          children: [
            ...item.children.map((child) => {
              return getChildRoutes(child);
            }),
          ],
        };
      } else {
        return {
          path: item.path,
          element: item.element,
        };
      }
    };

    return [
      ...routesList.map(getChildRoutes),
      { path: "*", element: <ErrorBoundary /> },
    ];
  };

  const routesList = items(hasPerm);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: !isAuthorized ? (
        <Login />
      ) : (
        <Navigate to="admin/overview" replace />
      ),
    },
    {
      path: "/admin",
      errorElement: <ErrorBoundary />,
      element: !isAuthorized ? <Navigate to="/login" /> : <DashboardLayout />,
      children: [
        ...getDashboardRoutes(),
        {
          path: "profile",
          index: true,
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
          path: "survey/:id",
          element: <CampaignDetails />,
        },
      ],
    },
    {
      path: ":type/:hash",
      element: <SurveyPreview />,
    },
    {
      path: "*",
      element: !isAuthorized ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="admin/overview" />
      ),
    },
  ]);

  return router;
};

export const ErrorBoundary = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
