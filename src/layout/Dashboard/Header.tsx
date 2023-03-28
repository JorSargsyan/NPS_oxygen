import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import {
  Avatar,
  Box,
  IconButton,
  Skeleton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
import LanguageMenu from "shared/components/LanguageMenu";
import { usePopover } from "shared/helpers/hooks/usePopover";
import { EBaseUrl } from "store/config/constants";
import { selectUserInfo } from "store/slicers/users";
import AccountPopover from "./account";
import { useLocation } from "react-router-dom";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const location = useLocation();
  const { onNavOpen } = props;
  const lgUp = useMediaQuery<any>((theme) => theme.breakpoints.up("lg"));

  const sidebarBtnVisible = location.pathname.includes("/campaign/");

  const accountPopover = usePopover();
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${!sidebarBtnVisible ? SIDE_NAV_WIDTH : 0}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${!sidebarBtnVisible ? SIDE_NAV_WIDTH : 0}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {(!lgUp || sidebarBtnVisible) && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            {/* <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
            <LanguageMenu />
            {userInfo ? (
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src={
                  EBaseUrl.MediaUserURL
                    ? `${EBaseUrl.MediaUserURL}/${userInfo?.imagePath}`
                    : "/assets/avatars/avatar-anika-visser.png"
                }
              />
            ) : (
              <Skeleton width={40} height={60} sx={{ borderRadius: "50%" }} />
            )}
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};
