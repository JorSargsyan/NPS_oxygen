import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { LStorage } from "store/config/constants";
import { signOut } from "store/slicers/auth";
import { selectUserInfo } from "store/slicers/users";

const AccountPopover = (props) => {
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();
  const userInfo = useSelector(selectUserInfo);
  const { anchorEl, onClose, open } = props;

  const handleSignOut = () => {
    localStorage.removeItem(LStorage.AUTH);
    dispatch(signOut());
  };

  const handleProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {userInfo?.name} {userInfo?.surname}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
