import { useCallback, useEffect, useState } from "react";
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
import {
  GetPermissionGroups,
  setLoading,
  setTableLoading,
} from "store/slicers/common";
import toast from "react-hot-toast";
import RightDrawer from "shared/ui/Drawer";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEditRoles from "./components/AddEditRoles";
import {
  DeleteRole,
  GetRoleById,
  GetRoles,
  selectRoles,
} from "store/slicers/roles";
import { IRole, IRoleDetailed } from "store/interfaces/roles";
import { GetUserGroups } from "store/slicers/users";
import { ERequestStatus } from "store/enums/index.enum";
import { ERolesPermissions } from "resources/permissions/permissions.enum";
import usePermission from "shared/helpers/hooks/usePermission";
import useTranslation from "shared/helpers/hooks/useTranslation";

const RolesPage = () => {
  const [activeRow, setActiveRow] = useState<IRoleDetailed>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isWarningOpen, setWarningOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const roles = useSelector(selectRoles);
  const t = useTranslation();

  const hasEditPermission = usePermission(ERolesPermissions.Edit);
  const hasCreatePermission = usePermission(ERolesPermissions.Create);
  const hasDeletePermission = usePermission(ERolesPermissions.Create);

  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const refetchRoles = () => {
    dispatch(GetRoles(methods.watch("config")));
  };

  const handleEdit = async (row: IRole) => {
    const { meta, payload } = await dispatch(GetRoleById(row.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    setActiveRow({ ...payload, id: row.id });
    setDrawerOpen(true);
  };

  const handleOpenWarning = (row: IRole) => {
    setActiveRow(row as IRoleDetailed);
    setWarningOpen(true);
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const handleDelete = async () => {
    if (!activeRow) {
      return;
    }
    dispatch(setLoading(true));
    const { meta } = await dispatch(DeleteRole(activeRow.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      dispatch(setLoading(false));
      return;
    }
    setActiveRow(undefined);
    await refetchRoles();
    dispatch(setLoading(false));
    toast.success("Role is deleted");
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    refetchRoles();
  };

  const getActions = (rowData: IRole) => {
    return [
      ...(hasEditPermission
        ? [
            {
              label: "Edit",
              onClick: () => handleEdit(rowData),
            },
          ]
        : []),
      ...(hasDeletePermission
        ? [
            {
              label: "Delete",
              onClick: () => handleOpenWarning(rowData),
            },
          ]
        : []),
    ];
  };

  const init = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await Promise.all([
      dispatch(GetRoles(defaultFilterValues)),
      dispatch(GetUserGroups()),
      dispatch(GetPermissionGroups()),
    ]);
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" fontWeight={500} color="text.secondary">
          {t("roles_section_title")}
        </Typography>
        {hasCreatePermission && (
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="outlined"
            onClick={() => setDrawerOpen(true)}
          >
            {t("add")}
          </Button>
        )}
      </Box>
      <BasicTable<IRole>
        toolbar={false}
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={roleColumns}
        paginatedData={roles}
        onChange={refetchRoles}
        getActions={getActions}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        width={RIGHT_SIDEBAR_WIDTH_EXTENDED}
        title={`${activeRow ? t("edit") : t("add")} ${t("role")}`}
      >
        <AddEditRoles
          editData={activeRow}
          rowId={activeRow?.id}
          onSuccess={onFormSuccess}
        />
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
