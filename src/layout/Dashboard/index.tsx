import { styled, Theme, useTheme } from "@mui/material/styles";
import { SideNav } from "./Navigation";
import { TopNav } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { LStorage } from "store/config/constants";
import { selectAuth } from "store/slicers/auth";
import {
  GetPermissions,
  GetConfig,
  selectSidebarVisible,
  setTranslationsLoaded,
  selectIsTranslationLoaded,
} from "store/slicers/common";
import { GetTranslationsByLangId } from "store/slicers/translations";
import { GetCurrentUser } from "store/slicers/users";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")<{ hasPadding: boolean; theme: Theme }>(
  ({ theme, hasPadding }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
  })
);

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const DashboardLayout = () => {
  const sidebarVisibility = useSelector(selectSidebarVisible);
  const theme = useTheme();
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const location = useLocation();
  const isCampaignDetailsPage = location.pathname.includes("/survey/");
  const loaded = useSelector(selectIsTranslationLoaded);

  const dispatch = useAsyncDispatch();
  const isAuthorized = useSelector(selectAuth);

  const fetchDashboardData = useCallback(async () => {
    const activeLang = Number(localStorage.getItem(LStorage.LANG));

    await Promise.all([
      dispatch(GetPermissions()),
      dispatch(GetCurrentUser()),
      dispatch(GetConfig()),
      dispatch(GetTranslationsByLangId(activeLang || 2)),
    ]);
    await dispatch(setTranslationsLoaded(true));
  }, [dispatch]);

  const paddingLeft = useMemo(() => {
    if (!lgUp) {
      return 0;
    } else {
      return sidebarVisibility && !isCampaignDetailsPage
        ? `${SIDE_NAV_WIDTH}px`
        : 0;
    }
  }, [isCampaignDetailsPage, lgUp, sidebarVisibility]);

  useEffect(() => {
    if (isAuthorized) {
      fetchDashboardData();
    }
  }, [fetchDashboardData, isAuthorized]);

  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        ...(!loaded ? { filter: "blur(20px)" } : {}),
      }}
    >
      <TopNav />
      <SideNav />
      <LayoutRoot
        sx={{
          paddingLeft,
        }}
        theme={theme}
        hasPadding={!isCampaignDetailsPage}
      >
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </Box>
  );
};

export default DashboardLayout;
