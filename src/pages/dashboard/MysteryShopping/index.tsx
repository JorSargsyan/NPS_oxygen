import { useEffect } from "react";
import BasicTable from "shared/ui/Table";
import { useCaseData, useCaseColumns, IUseCase } from "./constants";
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import VideoIcon from "@heroicons/react/24/outline/VideoCameraIcon";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { setTableLoading } from "store/slicers/common";
import { IColumn } from "shared/ui/Table/constants";
import { useNavigate } from "react-router-dom";

const MysteryShopping = () => {
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();

  const handleNavigate = (id: number) => {
    navigate(`/admin/mystery-shopping/${id}`);
  };

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
    dispatch(setTableLoading(false));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h4" fontWeight={500} color="text.secondary">
          Use Cases
        </Typography>
      </Box>
      <BasicTable<IUseCase>
        columns={columnsData}
        data={useCaseData}
        sortable={false}
        enablePagination={false}
      />
    </Box>
  );
};

export default MysteryShopping;
