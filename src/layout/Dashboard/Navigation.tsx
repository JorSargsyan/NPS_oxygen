import {
  Box,
  Divider,
  Drawer,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "components/logo";
import { Scrollbar } from "components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./NavigationItem";
import { useLocation } from "react-router-dom";
import { selectSidebarVisible, setSidebarVisible } from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
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

export const SideNav = () => {
  const location = useLocation();
  const dispatch = useAsyncDispatch();
  const open = useSelector(selectSidebarVisible);
  const hasCustomerPerm = usePermission(ECustomersPermissions.Read);
  const hasRolesPerm = usePermission(ERolesPermissions.Read);
  const hasUsersPerm = usePermission(EUserPermissions.Read);
  const hasTranslationPerm = usePermission(ETranslationPermissions.Read);
  const hasDirectoratePerm = usePermission(EDirectoratePermissions.Read);
  const hasFeedbackPerm = usePermission(EFeedbackPermissions.Read);
  const hasCampaignPerm = usePermission(ECampaignPermissions.Read);

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

  const onClose = useCallback(() => {
    dispatch(setSidebarVisible(false));
  }, [dispatch]);

  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const isCampaignDetailsPage = location.pathname.includes("/campaign/");

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
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
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <Typography color="inherit" variant="subtitle1">
                  NPS
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  OXYGEN
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
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

              return (
                <SideNavItem
                  active={active}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  return (
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
      variant={!lgUp || !isCampaignDetailsPage ? "permanent" : "temporary"}
    >
      {content}
    </Drawer>
  );
};
