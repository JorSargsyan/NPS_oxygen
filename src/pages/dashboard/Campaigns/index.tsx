import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { columns, deleteCampaignWarningConfig } from "./constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  RIGHT_SIDEBAR_WIDTH,
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
  defaultFilterValues,
} from "resources/constants";
import RightDrawer from "shared/ui/Drawer";
import { ICampaign } from "store/interfaces/campaigns";
import {
  DeleteCampaign,
  GetCampaignLogs,
  GetCampaigns,
  selectCampaigns,
} from "store/slicers/campaigns";
import Rename from "./components/Rename";
import HistoryView from "./components/HistoryView";
import { ERequestStatus } from "store/enums/index.enum";
import SharedDialog from "shared/ui/Dialog";
import { setLoading } from "store/slicers/common";
import toast from "react-hot-toast";

export enum ECampaignAction {
  ViewHistory = "ViewHistory",
  Rename = "Rename",
}

const CampaignsPage = () => {
  const dispatch = useAsyncDispatch();
  const campaigns = useSelector(selectCampaigns);
  const [activeRow, setActiveRow] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [rowHistory, setRowHistory] = useState([]);
  const [mode, setMode] = useState<ECampaignAction>();
  const [editData, setEditData] = useState<ICampaign>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchData = () => {
    dispatch(GetCampaigns(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    // console.log(ids);
  };

  const handleViewHistory = async (rowId: number) => {
    setActiveRow(rowId);
    setMode(ECampaignAction.ViewHistory);

    const { meta, payload } = await dispatch(GetCampaignLogs(rowId));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    setRowHistory(payload);
    setDrawerOpen(true);
  };

  const handleRenameCampaign = (rowData: ICampaign) => {
    setActiveRow(rowData.id);
    setEditData(rowData);
    setMode(ECampaignAction.Rename);
    setDrawerOpen(true);
  };

  const handleOpenWarning = (rowData: ICampaign) => {
    setActiveRow(rowData?.id);
    setWarningOpen(true);
  };

  const handleDelete = async () => {
    if (!activeRow) {
      return;
    }
    dispatch(setLoading(true));
    const { meta } = await dispatch(DeleteCampaign(activeRow));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      dispatch(setLoading(false));
      return;
    }
    setActiveRow(undefined);
    await refetchData();
    dispatch(setLoading(false));
    toast.success("Campaign is deleted");
  };

  const getActions = (rowData: ICampaign) => {
    return [
      {
        label: "View History",
        onClick: () => handleViewHistory(rowData.id),
      },
      {
        label: "Rename",
        onClick: () => handleRenameCampaign(rowData),
      },
      {
        label: "Delete",
        onClick: () => handleOpenWarning(rowData),
      },
    ];
  };

  const handleSuccess = () => {
    setDrawerOpen(false);
    refetchData();
  };

  useEffect(() => {
    dispatch(GetCampaigns(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3">Campaigns</Typography>
      <BasicTable<ICampaign>
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={columns}
        getActions={getActions}
        paginatedData={campaigns}
        onChange={refetchData}
        onChangeSelected={handleChangeSelected}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        width={
          mode === ECampaignAction.Rename
            ? RIGHT_SIDEBAR_WIDTH
            : RIGHT_SIDEBAR_WIDTH_EXTENDED
        }
        onClose={() => setDrawerOpen(false)}
        title={
          mode === ECampaignAction.Rename
            ? "Rename Campaign"
            : "View Campaign history"
        }
      >
        {mode === ECampaignAction.Rename ? (
          <Rename data={editData} onSuccess={handleSuccess} />
        ) : (
          <HistoryView data={rowHistory} />
        )}
      </RightDrawer>
      <SharedDialog
        open={warningOpen}
        setOpen={setWarningOpen}
        onSuccess={handleDelete}
        textConfig={deleteCampaignWarningConfig}
      />
    </Box>
  );
};

export default CampaignsPage;
