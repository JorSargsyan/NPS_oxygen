import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultFilterValues } from "resources/constants";
import { EDirectoratePermissions } from "resources/permissions/permissions.enum";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import usePermission from "shared/helpers/hooks/usePermission";
import RightDrawer from "shared/ui/Drawer";
import BasicTable from "shared/ui/Table";
import { ERequestStatus } from "store/enums/index.enum";
import {
  IAttachedEmployeeAdditionalInfo,
  IDirectorate,
} from "store/interfaces/directorates";
import { setTableLoading } from "store/slicers/common";
import {
  GetDirectorateById,
  GetDirectorates,
  selectDirectorates,
} from "store/slicers/directorates";
import AddEditDirectorate from "./components/AddEditDirectorate";
import { columns } from "./constants";

export interface IActiveRow {
  id: number;
  name: string;
  attachedEmployeeAdditionalInfo: IAttachedEmployeeAdditionalInfo[];
}

const DirectoratesGrid = () => {
  const [activeRow, setActiveRow] = useState<IActiveRow>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const directorates = useSelector(selectDirectorates);
  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const hasEditPermission = usePermission(EDirectoratePermissions.Edit);
  const hasCreatePermission = usePermission(EDirectoratePermissions.Create);

  const refetchRoles = async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetDirectorates(methods.watch("config")));
    await dispatch(setTableLoading(false));
  };

  const handleEdit = async (row: IDirectorate) => {
    const { meta, payload } = await dispatch(GetDirectorateById(row.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    setActiveRow({ ...payload, id: row.id });
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    refetchRoles();
  };

  const getActions = (rowData: IDirectorate) => {
    if (!hasEditPermission) {
      return [];
    }
    return [
      {
        label: "Edit",
        onClick: () => handleEdit(rowData),
      },
    ];
  };

  const initialFetch = useCallback(async () => {
    await dispatch(setTableLoading(true));
    const { meta } = await dispatch(GetDirectorates(defaultFilterValues));
    if (meta.requestStatus === ERequestStatus.FULFILLED) {
      await dispatch(setTableLoading(false));
    } else {
      await dispatch(setTableLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" fontWeight={500}>
          Directorates
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
            Add
          </Button>
        )}
      </Box>
      <BasicTable<IDirectorate>
        toolbar={false}
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={columns}
        paginatedData={directorates}
        onChange={refetchRoles}
        getActions={getActions}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title={`${activeRow ? "Edit" : "Add"} Directorate`}
      >
        <AddEditDirectorate editData={activeRow} onSuccess={onFormSuccess} />
      </RightDrawer>
    </Box>
  );
};

export default DirectoratesGrid;
