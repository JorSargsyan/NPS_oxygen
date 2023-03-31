import { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "./Navigation";
import { TopNav } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSidebarVisible, setSidebarVisible } from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme, hasPadding }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: hasPadding ? SIDE_NAV_WIDTH : 0,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

const DashboardLayout = () => {
  const location = useLocation();
  const isCampaignDetailsPage = location.pathname.includes("/campaign/");

  return (
    <>
      <TopNav />
      <SideNav />
      <LayoutRoot hasPadding={!isCampaignDetailsPage}>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

export default DashboardLayout;
