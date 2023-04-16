import { useEffect } from "react";
import BasicTable from "shared/ui/Table";
import { useCaseData, useCaseColumns, IUseCase } from "./constants";
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";
import VideoIcon from "@heroicons/react/24/outline/VideoCameraIcon";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { setTableLoading } from "store/slicers/common";
import { IColumn } from "shared/ui/Table/constants";

const MysteryShopping = () => {
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(setTableLoading(false));
  }, [dispatch]);

  const columnsData: IColumn[] = [
    ...useCaseColumns,
    {
      label: "View Video",
      layout: (row) => (
        <IconButton>
          <VideoIcon height={20} />
        </IconButton>
      ),
    },
  ];

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
