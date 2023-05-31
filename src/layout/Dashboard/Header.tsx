import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Skeleton,
  Stack,
  SvgIcon,
} from "@mui/material";
import { useSelector } from "react-redux";
import LanguageMenu from "shared/components/LanguageMenu";
import { usePopover } from "shared/helpers/hooks/usePopover";
import { selectUserInfo } from "store/slicers/users";
import AccountPopover from "./account";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  selectLoadingState,
  selectSidebarVisible,
  setSidebarVisible,
} from "store/slicers/common";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();
  const location = useLocation();
  const isSidebarVisible = useSelector(selectSidebarVisible);
  const isResponses = location.pathname.includes("/response");
  const accountPopover = usePopover();
  const userInfo = useSelector(selectUserInfo);
  const isLoading = useSelector(selectLoadingState);

  const handleClick = () => {
    dispatch(setSidebarVisible(!isSidebarVisible));
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ width: "100%", position: "absolute", top: 0, zIndex: 1500 }}>
          <LinearProgress color="primary" />
        </Box>
      )}
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "white",
          position: "sticky",
          left: {
            lg: `${isSidebarVisible ? SIDE_NAV_WIDTH : 0}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${isSidebarVisible ? SIDE_NAV_WIDTH : 0}px)`,
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
            {Object.values(params).length && !isResponses ? (
              <IconButton onClick={navigateBack}>
                <ArrowLeftIcon height={20} />
              </IconButton>
            ) : null}
            <IconButton onClick={handleClick}>
              <SvgIcon fontSize="small">
                <Bars3Icon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {/* <LanguageMenu /> */}
            {userInfo ? (
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src=""
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
