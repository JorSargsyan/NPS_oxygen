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
import usePermission from "shared/helpers/hooks/usePermission";
import { ECampaignPermissions } from "resources/permissions/permissions.enum";

export enum ECampaignAction {
  ViewHistory = "ViewHistory",
  Rename = "Rename",
  Add = "Add",
}

export enum ECampaignListViewTypes {
  Card = "Card",
  Grid = "Grid",
}

const surveyFilterValues = {
  ...defaultFilterValues,
  length: 10,
};

const CampaignsPage = () => {
  const dispatch = useAsyncDispatch();
  const navigate = useNavigate();
  const campaigns = useSelector(selectCampaigns);
  const [activeRow, setActiveRow] = useState(0);
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [rowHistory, setRowHistory] = useState([]);
  const [mode, setMode] = useState<ECampaignAction>();
  const [editData, setEditData] = useState<ICampaign>();
  const [campaignListVisibilityType, setCampaignListVisibilityType] = useState(
    ECampaignListViewTypes.Card
  );
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const methods = useForm({
    defaultValues: { config: surveyFilterValues },
  });

  const hasAddPermission = usePermission(ECampaignPermissions.Create);
  const hasDeletePermission = usePermission(ECampaignPermissions.Delete);
  const hasManagePermission = usePermission(ECampaignPermissions.Manage);

  const refetchData = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetCampaigns(methods.watch("config")));
    await dispatch(setTableLoading(false));
  }, [dispatch, methods]);

  const handleChangeSelected = (ids: number[]) => {
    // console.log(ids);
  };

  const handleViewHistory = useCallback(
    async (rowId: number) => {
      setActiveRow(rowId);
      setMode(ECampaignAction.ViewHistory);

      const { meta, payload } = await dispatch(GetCampaignLogs(rowId));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      setRowHistory(payload);
      setDrawerOpen(true);
    },
    [dispatch]
  );

  const handleRenameCampaign = (rowData: ICampaign) => {
    setActiveRow(rowData.id);
    setEditData(rowData);
    setMode(ECampaignAction.Rename);
    setAddEditOpen(true);
  };

  const handleOpenWarning = (rowData: ICampaign) => {
    setActiveRow(rowData?.id);
    setWarningOpen(true);
  };

  const handleAdd = () => {
    setAddEditOpen(true);
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

  const handleCampaignDetails = useCallback(
    (id: number) => {
      dispatch(setSidebarVisible(false));
      navigate(`/admin/survey/${id}`);
    },
    [dispatch, navigate]
  );

  const getActions = useCallback(
    (rowData: ICampaign) => {
      return [
        ...(hasManagePermission
          ? [
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
    },
    [
      hasManagePermission,
      hasDeletePermission,
      handleCampaignDetails,
      handleViewHistory,
    ]
  );

  const handleSuccess = async () => {
    setAddEditOpen(false);
    await refetchData();
    toast.success("Campaign name changed successfully");
  };

  const handleSuccessCreation = async (id: number) => {
    setDrawerOpen(false);
    navigate(`/admin/survey/${id}`);
  };

  const getDrawerTitle = () => {
    switch (mode) {
      case ECampaignAction.Add:
        return "Add survey";
      case ECampaignAction.Rename:
        return "Rename survey";
      case ECampaignAction.ViewHistory:
        return "View survey history";
    }
  };

  const handleChangeState = useCallback(
    async (id: number, state: boolean) => {
      const { meta } = await dispatch(ChangeCampaignState({ id, state }));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      await refetchData();
      toast.success(`Survey is ${!state ? "inactive" : "active"}`);
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
              color="success"
              disabled={!hasManagePermission}
              onChange={(e, checked) => handleChangeState(rowData.id, checked)}
              checked={rowData.isActive}
            />
          );
        },
      },
    ];
  }, [handleChangeState, hasManagePermission]);

  const initialFetch = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetCampaigns(surveyFilterValues));
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={500} color="text.secondary">
          Surveys
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <CampaignListViewTypes
            type={campaignListVisibilityType}
            setType={setCampaignListVisibilityType}
          />
          {hasAddPermission && (
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
          )}
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
        width={RIGHT_SIDEBAR_WIDTH_EXTENDED}
        onClose={() => setDrawerOpen(false)}
        title={getDrawerTitle()}
      >
        <HistoryView data={rowHistory} />
      </RightDrawer>
      <SharedDialog
        open={warningOpen}
        setOpen={setWarningOpen}
        onSuccess={handleDelete}
        textConfig={deleteCampaignWarningConfig}
      />
      <SharedDialog
        open={addEditOpen}
        setOpen={setAddEditOpen}
        hasActions={false}
        minWidth="400px"
        textConfig={{
          title: getDrawerTitle(),
        }}
      >
        {mode === ECampaignAction.Add && (
          <AddCampaign onSuccess={handleSuccessCreation} />
        )}
        {mode === ECampaignAction.Rename && (
          <Rename data={editData} onSuccess={handleSuccess} />
        )}
      </SharedDialog>
    </Box>
  );
};

export default CampaignsPage;
