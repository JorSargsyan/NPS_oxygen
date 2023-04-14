import { styled, Theme, useTheme } from "@mui/material/styles";
import { SideNav } from "./Navigation";
import { TopNav } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { LStorage } from "store/config/constants";
import { selectAuth } from "store/slicers/auth";
import { GetPermissions, GetConfig } from "store/slicers/common";
import { GetTranslationsByLangId } from "store/slicers/translations";
import { GetCurrentUser } from "store/slicers/users";
import { Box } from "@mui/system";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")<{ hasPadding: boolean; theme: Theme }>(
  ({ theme, hasPadding }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: hasPadding ? SIDE_NAV_WIDTH : 0,
    },
  })
);

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const DashboardLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isCampaignDetailsPage = location.pathname.includes("/survey/");

  const dispatch = useAsyncDispatch();
  const isAuthorized = useSelector(selectAuth);

  const fetchDashboardData = useCallback(async () => {
    const activeLang = Number(localStorage.getItem(LStorage.LANG));
    await Promise.all([
      dispatch(GetPermissions()),
      dispatch(GetCurrentUser()),
      dispatch(GetConfig()),
      dispatch(GetTranslationsByLangId(activeLang)),
    ]);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized && Number(localStorage.getItem(LStorage.LANG))) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, isAuthorized]);

  return (
    <Box sx={{ backgroundColor: "#F3F4F6" }}>
      <TopNav />
      <SideNav />
      <LayoutRoot theme={theme} hasPadding={!isCampaignDetailsPage}>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </Box>
  );
};

export default DashboardLayout;
