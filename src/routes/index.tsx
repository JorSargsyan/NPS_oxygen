import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import DashboardLayout from "layout/Dashboard";
import { items } from "layout/Dashboard/config";
import AccountPage from "pages/dashboard/Account";
import CampaignDetails from "pages/dashboard/CampaignDetails";
import FeedbackDetails from "pages/dashboard/FeedBacks/components/FeedbackDetails";
import SurveyPreview from "pages/Survey";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";

import usePermission from "shared/helpers/hooks/usePermission";
import { selectAuth } from "store/slicers/auth";
import Login from "../pages/auth/login";
import SmsDistributionForm from "pages/dashboard/CampaignDetails/distribution/SmsDistributionForm";
import MysteryShopperDetails from "pages/dashboard/MysteryShopping/Details";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { useRoutesReadPermissions } from "shared/helpers/hooks/useRoutesReadPermissions";

export const CreateRoutes = () => {
  const isAuthorized = useSelector(selectAuth);
  const hasPerm = useRoutesReadPermissions();
  const hasGridViewFeedbackCardPermission = usePermission(
    EFeedbackPermissions.View_feedback_card
  );

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
        {
          path: "mystery-shopping/:id",
          element: <MysteryShopperDetails />,
        },
        {
          path: "sms-share/:surveyID",
          element: <SmsDistributionForm />,
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
