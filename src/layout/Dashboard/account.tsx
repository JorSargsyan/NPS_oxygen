import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { LStorage } from "store/config/constants";
import { signOut } from "store/slicers/auth";

const AccountPopover = (props) => {
  const dispatch = useAsyncDispatch();
  const { anchorEl, onClose, open } = props;

  const handleSignOut = () => {
    localStorage.removeItem(LStorage.AUTH);
    dispatch(signOut());
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
          Anika Visser
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
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
