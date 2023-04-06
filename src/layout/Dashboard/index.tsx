import { styled, Theme, useTheme } from "@mui/material/styles";
import { SideNav } from "./Navigation";
import { TopNav } from "./Header";
import { Outlet, useLocation } from "react-router-dom";

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

  return (
    <>
      <>
        <TopNav />
        <SideNav />
        <LayoutRoot theme={theme} hasPadding={!isCampaignDetailsPage}>
          <LayoutContainer>
            <Outlet />
          </LayoutContainer>
        </LayoutRoot>
      </>
    </>
  );
};

export default DashboardLayout;
