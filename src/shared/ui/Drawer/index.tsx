import { Box, Drawer, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

export interface IRightDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

const RIGHT_SIDEBAR_WIDTH = 600;

const RightDrawer = ({
  open,
  setOpen,
  title,
  onClose,
  children,
}: IRightDrawerProps) => {
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <Box p={2} width={RIGHT_SIDEBAR_WIDTH}>
        <Box mt={2} mb={4} display="flex" justifyContent={"space-between"}>
          <Typography variant="h6">{title}</Typography>
          <Box sx={{ cursor: "pointer" }}>
            <CloseIcon onClick={handleClose} />
          </Box>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
