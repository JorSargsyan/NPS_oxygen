import { Button, Menu, MenuItem } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { Fragment, useCallback, useState } from "react";
import { IAction } from "../Table/constants";
import MoreIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import useTranslation from "shared/helpers/hooks/useTranslation";

export interface IDotMenuProps<T> {
  actions: IAction<T>[];
  row: T;
  onActionClick: (action: IAction<T>, row: T) => void;
}

const DotsMenu = <T extends unknown>({
  row,
  actions,
  onActionClick,
}: IDotMenuProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);
  const t = useTranslation();

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
    onMenuOpen(true);
  }, []);

  const handleClickMenuItem = (action: IAction<T>, row: T) => {
    onActionClick(action, row);
    onMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        aria-controls={menuOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
        disabled={!actions?.length}
        id={`basic-button-${nanoid(2)}`}
        startIcon={<MoreIcon height={24} width={24} />}
      ></Button>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => onMenuOpen(false)}
      >
        {actions?.map((action, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => handleClickMenuItem(action, row)}
            >
              {t(action.label)}
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};

export default DotsMenu;
