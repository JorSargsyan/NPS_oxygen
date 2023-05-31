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
import useTranslation from "shared/helpers/hooks/useTranslation";

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
  minWidth?: string;
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
  minWidth,
  handleCloseCb = undefined,
  fullScreen = false,
  sx,
}: ISharedDialogProps) => {
  const t = useTranslation();
  const handleSubmit = () => {
    onSuccess?.();
    setOpen(false);
  };

  const handleClose = () => {
    handleCloseCb?.();
    setOpen(false);
  };

  return (
    <Dialog
      sx={sx}
      open={open}
      onClose={handleClose}
      PaperComponent={Paper}
      fullScreen={fullScreen}
    >
      <Box
        minWidth={minWidth}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <DialogTitle style={{ cursor: "move" }}>{t(title)}</DialogTitle>
        <Box mr={2}>
          <Button onClick={handleClose}>
            <CrossIcon />
          </Button>
        </Box>
      </Box>
      <Divider />
      <DialogContent>
        {description ? (
          <DialogContentText>{t(description)}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      {hasActions ? (
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSubmit}>{t("submit")}</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default SharedDialog;
