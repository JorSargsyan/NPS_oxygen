import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { deleteTranslationWarningConfig, columns } from "./constants";
import { Box } from "@mui/system";
import { Button, SvgIcon, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import {
  DeleteTranslation,
  GetTranslations,
  selectTranslations,
} from "store/slicers/translations";
import { ITranslation } from "store/interfaces/translations";
import SharedDialog from "shared/ui/Dialog";
import { setTableLoading } from "store/slicers/common";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import RightDrawer from "shared/ui/Drawer";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEditTranslations from "./components/AddEditTranslations";
import Filters from "./components/Filters";

const Translations = () => {
  const [activeRow, setActiveRow] = useState<ITranslation>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isWarningOpen, setWarningOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const translations = useSelector(selectTranslations);
  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const refetchTranslations = async () => {
    await dispatch(setTableLoading(true));
    const data = {
      ...methods.watch("config"),
      filters: methods.watch("config.filters").filter((i) => i),
    };
    await dispatch(GetTranslations(data));
    await dispatch(setTableLoading(false));
  };

  const handleEdit = (row: ITranslation) => {
    setActiveRow(row);
    setDrawerOpen(true);
  };

  const handleOpenWarning = (row: ITranslation) => {
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
    const { key, translationModule } = activeRow;
    const { meta } = await dispatch(
      DeleteTranslation({ key, module: translationModule })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    setActiveRow(undefined);
    await refetchTranslations();
    toast.success("Translation is deleted");
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    refetchTranslations();
  };

  const getActions = (rowData: ITranslation) => {
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
    dispatch(GetTranslations(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Translations</Typography>
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
      <BasicTable<ITranslation>
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={columns}
        Filter={() => (
          <Filters onChange={refetchTranslations} methods={methods} />
        )}
        paginatedData={translations}
        onChange={refetchTranslations}
        getActions={getActions}
        hasSearchInput
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title={`${activeRow ? "Edit" : "Add"} Translation`}
      >
        <AddEditTranslations editData={activeRow} onSuccess={onFormSuccess} />
      </RightDrawer>
      <SharedDialog
        open={isWarningOpen}
        setOpen={setWarningOpen}
        onSuccess={handleDelete}
        textConfig={deleteTranslationWarningConfig}
      />
    </Box>
  );
};

export default Translations;
