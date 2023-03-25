import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultFilterValues } from "resources/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import RightDrawer from "shared/ui/Drawer";
import BasicTable from "shared/ui/Table";
import { ERequestStatus } from "store/enums/index.enum";
import {
  IAttachedEmployeeAdditionalInfo,
  IDirectorate,
} from "store/interfaces/directorates";
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

  const refetchRoles = () => {
    dispatch(GetDirectorates(methods.watch("config")));
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
    return [
      {
        label: "Edit",
        onClick: () => handleEdit(rowData),
      },
    ];
  };

  useEffect(() => {
    dispatch(GetDirectorates(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Directorates</Typography>
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
