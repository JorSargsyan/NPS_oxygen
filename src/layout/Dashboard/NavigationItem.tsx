import { Box, ButtonBase, Theme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { setSidebarVisible } from "store/slicers/common";

export const SideNavItem = (props) => {
  const dispatch = useAsyncDispatch();
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const {
    active = false,
    disabled,
    icon,
    path,
    title,
    hasChildren = false,
    onClick,
    expandableIcon,
  } = props;

  const handleNavigate = () => {
    navigate(path);
    if (!lgUp) {
      dispatch(setSidebarVisible(false));
    }
  };
  return (
    <li>
      <ButtonBase
        onClick={!hasChildren ? handleNavigate : onClick}
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "16px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "primary.main",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        {!hasChildren ? (
          <Box
            component="span"
            sx={{
              color: "neutral.400",
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "common.white",
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box
              component="span"
              sx={{
                color: "neutral.400",
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "24px",
                whiteSpace: "nowrap",
                ...(active && {
                  color: "common.white",
                }),
                ...(disabled && {
                  color: "neutral.500",
                }),
              }}
            >
              {title}
            </Box>
            <Box display="flex" alignItems="center">
              {expandableIcon}
            </Box>
          </Box>
        )}
      </ButtonBase>
    </li>
  );
};
