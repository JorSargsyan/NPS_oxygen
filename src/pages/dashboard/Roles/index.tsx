import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { deleteRoleWarningConfig, roleColumns } from "./constants";
import { Box } from "@mui/system";
import { Button, SvgIcon, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
  defaultFilterValues,
} from "resources/constants";
import SharedDialog from "shared/ui/Dialog";
import { GetPermissionGroups, setLoading } from "store/slicers/common";
import toast from "react-hot-toast";
import RightDrawer from "shared/ui/Drawer";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEditRoles from "./components/AddEditRoles";
import { GetRoles, selectRoles } from "store/slicers/roles";
import { IRole } from "store/interfaces/roles";
import { GetUserGroups } from "store/slicers/users";

const RolesPage = () => {
  const [activeRow, setActiveRow] = useState<IRole>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isWarningOpen, setWarningOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const roles = useSelector(selectRoles);
  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchRoles = () => {
    dispatch(GetRoles(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  const handleEdit = (row: IRole) => {
    setActiveRow(row);
    setDrawerOpen(true);
  };

  const handleOpenWarning = (row: IRole) => {
    setActiveRow(row);
    setWarningOpen(true);
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const handleDelete = async () => {
    if (!activeRow) {
      return;
    }
    // dispatch(setLoading(true));
    // const { meta } = await dispatch();
    // DeleteRole({ key, module: translationModule })
    // if (meta.requestStatus !== ERequestStatus.FULFILLED) {
    //   dispatch(setLoading(false));
    //   return;
    // }
    setActiveRow(undefined);
    await refetchRoles();
    dispatch(setLoading(false));
    toast.success("Country is deleted");
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    refetchRoles();
  };

  const getActions = (rowData: IRole) => {
    return [
      {
        label: "Edit",
        onClick: () => handleEdit(rowData),
      },
      {
        label: "Delete",
        onClick: () => handleOpenWarning(rowData),
      },
    ];
  };

  useEffect(() => {
    Promise.all([
      dispatch(GetRoles(defaultFilterValues)),
      dispatch(GetUserGroups()),
      dispatch(GetPermissionGroups()),
    ]);
  }, [dispatch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Roles</Typography>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="outlined"
          onClick={() => setDrawerOpen(true)}
        >
          Add
        </Button>
      </Box>
      <BasicTable<IRole>
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={roleColumns}
        paginatedData={roles}
        onChange={refetchRoles}
        onChangeSelected={handleChangeSelected}
        getActions={getActions}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        width={RIGHT_SIDEBAR_WIDTH_EXTENDED}
        title={`${activeRow ? "Edit" : "Add"} Role`}
      >
        <AddEditRoles editData={activeRow} onSuccess={onFormSuccess} />
      </RightDrawer>
      <SharedDialog
        open={isWarningOpen}
        setOpen={setWarningOpen}
        onSuccess={handleDelete}
        textConfig={deleteRoleWarningConfig}
      />
    </Box>
  );
};

export default RolesPage;
