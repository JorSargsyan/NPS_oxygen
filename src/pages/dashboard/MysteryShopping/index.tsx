import { useEffect, useState } from "react";
import BasicTable from "shared/ui/Table";
import { useCaseData, useCaseColumns, IUseCase } from "./constants";
import { Box } from "@mui/system";
import { Button, IconButton, Typography } from "@mui/material";
import VideoIcon from "@heroicons/react/24/outline/VideoCameraIcon";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { setTableLoading } from "store/slicers/common";
import { IColumn } from "shared/ui/Table/constants";
import { useNavigate } from "react-router-dom";
import RightDrawer from "shared/ui/Drawer";
import AddUseCase from "./components/AddUseCase";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const MysteryShopping = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();

  const handleNavigate = (id: number) => {
    navigate(`/admin/mystery-shopping/${id}`);
  };

  const useCaseList = JSON.parse(localStorage.getItem("useCaseData"));

  const columnsData: IColumn[] = [
    ...useCaseColumns,
    {
      label: "Details",
      layout: (row: IUseCase) => (
        <Typography>
          {JSON.parse(localStorage.getItem(row.caseId))?.comment || "-"}
        </Typography>
      ),
    },
    {
      label: "Evaluation",
      layout: (row: IUseCase) => (
        <Typography>
          {JSON.parse(localStorage.getItem(row.caseId))?.evaluation || "-"}
        </Typography>
      ),
    },
    {
      label: "View Video",
      layout: (row: IUseCase) => (
        <IconButton onClick={() => handleNavigate(row.id)}>
          <VideoIcon height={20} />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    if (!useCaseList?.length) {
      localStorage.setItem("useCaseData", JSON.stringify(useCaseData));
    }
    dispatch(setTableLoading(false));
  }, [dispatch, useCaseList?.length]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h4" fontWeight={500} color="text.secondary">
          Mystery shopping
        </Typography>
        <Button
          onClick={() => setDrawerOpen(true)}
          variant="outlined"
          startIcon={<PlusIcon height={20} />}
        >
          <Typography>Add </Typography>
        </Button>
      </Box>
      <BasicTable<IUseCase>
        columns={columnsData}
        data={useCaseList || useCaseData}
        sortable={false}
        enablePagination={false}
      />
      <RightDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={"Add Use case"}
      >
        <AddUseCase onSuccess={() => setDrawerOpen(false)} />
      </RightDrawer>
    </Box>
  );
};

export default MysteryShopping;
