import {
  Box,
  Collapse,
  Divider,
  Drawer,
  Skeleton,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";

import Logo from "assets/icons/logo_dark_transparent.png";
import { items } from "./config";
import { SideNavItem } from "./NavigationItem";
import { useLocation, useNavigate } from "react-router-dom";
import {
  selectPermissions,
  selectSidebarVisible,
  setSidebarVisible,
} from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { useSelector } from "react-redux";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useRoutesReadPermissions } from "shared/helpers/hooks/useRoutesReadPermissions";

enum EExpandedRowsTypes {
  Settings = "settings",
}

const skeletonArr = new Array(7).fill("");

export const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAsyncDispatch();
  const open = useSelector(selectSidebarVisible);
  const permList = useSelector(selectPermissions);

  const hasPerm = useRoutesReadPermissions();

  const routesList = items(hasPerm);

  const onClose = useCallback(() => {
    dispatch(setSidebarVisible(false));
  }, [dispatch]);

  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const isCampaignDetailsPage = location.pathname.includes("/survey/");
  const [isExpanded, setExpanded] = useState({ settings: false });

  const handleExpandRow = (type: EExpandedRowsTypes) => {
    setExpanded({
      ...isExpanded,
      [type]: !isExpanded[type],
    });
  };

  const handleNavigateToDashboard = () => {
    navigate("/admin");
  };

  useEffect(() => {
    if (!lgUp) {
      onClose();
    }
  }, [lgUp, onClose]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <Box
            flexDirection={"row"}
            width="100%"
            display="flex"
            onClick={handleNavigateToDashboard}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box
              sx={{
                display: "inline-flex",
                height: 60,
              }}
            >
              <img src={Logo} alt="" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
      {!permList ? (
        <Box pt={3}>
          {skeletonArr.map((i, index) => (
            <Skeleton
              key={index}
              sx={{ backgroundColor: "neutral.400", my: 2, mx: 1 }}
              variant="rounded"
              width={"90%"}
              height="40px"
            />
          ))}
        </Box>
      ) : (
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {routesList.map((item) => {
              const active = location.pathname.includes(item.path);
              if (item?.children?.length) {
                const activeRoute = item.children.find((i) =>
                  location.pathname.includes(i.path)
                );
                return (
                  <Fragment key={item.title}>
                    <SideNavItem
                      hasChildren
                      onClick={() =>
                        handleExpandRow(EExpandedRowsTypes.Settings)
                      }
                      active={!!activeRoute}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                      expandableIcon={
                        isExpanded.settings ? <ExpandLess /> : <ExpandMore />
                      }
                    />
                    {item.children.map((child) => {
                      const activeChild = location.pathname.includes(
                        child.path
                      );
                      return (
                        <Collapse
                          in={isExpanded.settings}
                          timeout="auto"
                          unmountOnExit
                          key={child.path}
                        >
                          <SideNavItem
                            active={activeChild}
                            icon={child.icon}
                            key={child.title}
                            path={child.path}
                            title={child.title}
                          />
                        </Collapse>
                      );
                    })}
                  </Fragment>
                );
              } else {
                return (
                  <SideNavItem
                    active={active}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              }
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );

  return lgUp ? (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      ModalProps={{
        disablePortal: true,
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={isCampaignDetailsPage ? "temporary" : "persistent"}
    >
      {content}
    </Drawer>
  ) : (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      ModalProps={{
        disablePortal: true,
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={"temporary"}
    >
      {content}
    </Drawer>
  );
};
