import {
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Divider,
  SxProps,
} from "@mui/material";
import CrossIcon from "@mui/icons-material/Close";
import React, { ReactNode } from "react";

export interface ISharedDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  textConfig: {
    title: string;
    description?: string;
  };
  hasActions?: boolean;
  onSuccess?: () => void;
  children?: ReactNode;
  handleCloseCb?: () => void;
  fullScreen?: boolean;
  sx?: SxProps<any>;
}

const SharedDialog = ({
  open,
  setOpen,
  textConfig: { title, description },
  onSuccess,
  hasActions = true,
  children,
  handleCloseCb = undefined,
  fullScreen = false,
  sx,
}: ISharedDialogProps) => {
  const handleSubmit = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseCb?.();
  };

  return (
    <Dialog
      sx={sx}
      open={open}
      onClose={handleClose}
      PaperComponent={Paper}
      fullScreen={fullScreen}
    >
      <Box display="flex" alignItems="center" justifyContent={"space-between"}>
        <DialogTitle style={{ cursor: "move" }}>{title}</DialogTitle>
        <Box mr={2}>
          <Button onClick={handleClose}>
            <CrossIcon />
          </Button>
        </Box>
      </Box>
      <Divider />
      <DialogContent>
        {description ? (
          <DialogContentText>{description}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      {hasActions ? (
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default SharedDialog;
