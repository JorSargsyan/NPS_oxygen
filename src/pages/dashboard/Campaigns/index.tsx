import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { columns } from "./constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import RightDrawer from "shared/ui/Drawer";
import { ICampaign } from "store/interfaces/campaigns";
import { GetCampaigns, selectCampaigns } from "store/slicers/campaigns";

const CampaignsPage = () => {
  const dispatch = useAsyncDispatch();
  const campaigns = useSelector(selectCampaigns);
  const [activeRow, setActiveRow] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchData = () => {
    dispatch(GetCampaigns(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  const handleView = (rowId: number) => {
    setActiveRow(rowId);
    setDrawerOpen(true);
  };

  const getActions = (rowData: ICampaign) => {
    return [
      {
        label: "View",
        onClick: () => handleView(rowData.id),
      },
    ];
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
      {/* <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`View User`}
      >
        <UserDetails userId={activeRow} />
      </RightDrawer> */}
    </Box>
  );
};

export default CampaignsPage;
