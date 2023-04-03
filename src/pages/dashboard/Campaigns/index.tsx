import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Button, SvgIcon, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  defaultFilterValues,
  RIGHT_SIDEBAR_WIDTH,
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
} from "resources/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import SharedDialog from "shared/ui/Dialog";
import RightDrawer from "shared/ui/Drawer";
import BasicTable from "shared/ui/Table";
import { ERequestStatus } from "store/enums/index.enum";
import { ICampaign } from "store/interfaces/campaigns";
import {
  ChangeCampaignState,
  DeleteCampaign,
  GetCampaignLogs,
  GetCampaigns,
  selectCampaigns,
} from "store/slicers/campaigns";
import {
  setLoading,
  setSidebarVisible,
  setTableLoading,
} from "store/slicers/common";
import CampaignListViewTypes from "./components/CampaignListTypes";
import AddCampaign from "./components/AddCampaign";
import HistoryView from "./components/HistoryView";
import Rename from "./components/Rename";
import { columns, deleteCampaignWarningConfig } from "./constants";
import CampaignCardsList from "./components/CampaignCardsList";

export enum ECampaignAction {
  ViewHistory = "ViewHistory",
  Rename = "Rename",
  Add = "Add",
}

export enum ECampaignListViewTypes {
  Card = "Card",
  Grid = "Grid",
}

const CampaignsPage = () => {
  const dispatch = useAsyncDispatch();
  const navigate = useNavigate();
  const campaigns = useSelector(selectCampaigns);
  const [activeRow, setActiveRow] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [rowHistory, setRowHistory] = useState([]);
  const [mode, setMode] = useState<ECampaignAction>();
  const [editData, setEditData] = useState<ICampaign>();
  const [campaignListVisibilityType, setCampaignListVisibilityType] = useState(
    ECampaignListViewTypes.Card
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const refetchData = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetCampaigns(methods.watch("config")));
    await dispatch(setTableLoading(false));
  }, [dispatch, methods]);

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

  const handleAdd = () => {
    setDrawerOpen(true);
    setMode(ECampaignAction.Add);
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

  const handleCampaignDetails = (id: number) => {
    dispatch(setSidebarVisible(false));
    navigate(`/campaign/${id}`);
  };

  const getActions = (rowData: ICampaign) => {
    return [
      {
        label: "Customize",
        onClick: () => handleCampaignDetails(rowData.id),
      },
      {
        label: "View History",
        onClick: () => handleViewHistory(rowData?.id),
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

  const handleSuccess = async () => {
    setDrawerOpen(false);
    await refetchData();
    toast.success("Campaign name changed successfully");
  };

  const handleSuccessCreation = async (id: number) => {
    setDrawerOpen(false);
    navigate(`/campaign/${id}`);
  };

  const getDrawerTitle = () => {
    switch (mode) {
      case ECampaignAction.Add:
        return "Add campaign";
      case ECampaignAction.Rename:
        return "Remane campaign";
      case ECampaignAction.ViewHistory:
        return "View campaign history";
    }
  };

  const handleChangeState = useCallback(
    async (id: number, state: boolean) => {
      await dispatch(ChangeCampaignState({ id, state }));
      await refetchData();
    },
    [dispatch, refetchData]
  );

  const campaignColumns = useMemo(() => {
    return [
      ...columns,
      {
        label: "State",
        layout: (rowData: ICampaign) => {
          return (
            <Switch
              onChange={(e, checked) => handleChangeState(rowData.id, checked)}
              checked={rowData.isActive}
            />
          );
        },
      },
    ];
  }, [handleChangeState]);

  const initialFetch = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetCampaigns(defaultFilterValues));
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Campaigns</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <CampaignListViewTypes
            type={campaignListVisibilityType}
            setType={setCampaignListVisibilityType}
          />
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="outlined"
            onClick={handleAdd}
          >
            Add
          </Button>
        </Box>
      </Box>

      <Box>
        {campaignListVisibilityType === ECampaignListViewTypes.Grid ? (
          <BasicTable<ICampaign>
            filterOptions={{ watch: methods.watch, reset: methods.reset }}
            columns={campaignColumns}
            toolbar={false}
            getActions={getActions}
            paginatedData={campaigns}
            onChange={refetchData}
            onChangeSelected={handleChangeSelected}
          />
        ) : (
          <CampaignCardsList
            filterOptions={{ watch: methods.watch, reset: methods.reset }}
            list={campaigns}
            actions={getActions}
            handleChangeState={handleChangeState}
            onChange={refetchData}
          />
        )}
      </Box>

      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        width={
          mode === ECampaignAction.Rename || mode === ECampaignAction.Add
            ? RIGHT_SIDEBAR_WIDTH
            : RIGHT_SIDEBAR_WIDTH_EXTENDED
        }
        onClose={() => setDrawerOpen(false)}
        title={getDrawerTitle()}
      >
        {mode === ECampaignAction.Rename && (
          <Rename data={editData} onSuccess={handleSuccess} />
        )}
        {mode === ECampaignAction.ViewHistory && (
          <HistoryView data={rowHistory} />
        )}
        {mode === ECampaignAction.Add && (
          <AddCampaign onSuccess={handleSuccessCreation} />
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
