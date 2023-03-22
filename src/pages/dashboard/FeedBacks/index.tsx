import { MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultFilterValues } from "resources/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicTable from "shared/ui/Table";
import { ERequestStatus } from "store/enums/index.enum";
import { IFeedback } from "store/interfaces/feedback";
import {
  ChangeFeedbackStatus,
  GetFeedbacks,
  selectFeedbacks,
} from "store/slicers/feedback";
import { feedbackColumns } from "./constants";

const Feedbacks = () => {
  const dispatch = useAsyncDispatch();
  const feedbacks = useSelector(selectFeedbacks);

  const handleChangeStatus = async (e, rowId) => {
    const { meta } = await dispatch(
      ChangeFeedbackStatus({
        id: rowId,
        formData: {
          state: e.target.value,
        },
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    refetchFeedbacks();
  };

  const statusColumn = {
    label: "Status",
    layout: (row: IFeedback) => {
      return (
        <Box>
          <Select
            size="small"
            value={row.feedbackStatus.id}
            onChange={(e) => handleChangeStatus(e, row.id)}
          >
            <MenuItem value={1}>New</MenuItem>
            <MenuItem value={2}>Follow up</MenuItem>
            <MenuItem value={3}>Postponed</MenuItem>\
            <MenuItem value={4}>No response</MenuItem>
            <MenuItem value={5}>Resolved</MenuItem>
            <MenuItem value={6}>Not resolved</MenuItem>
            <MenuItem value={7}>Misrated</MenuItem>
            <MenuItem value={6}>Archived</MenuItem>
          </Select>
        </Box>
      );
    },
  };

  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchFeedbacks = () => {
    dispatch(GetFeedbacks(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  useEffect(() => {
    dispatch(GetFeedbacks(defaultFilterValues));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3">Feedbacks</Typography>
      <BasicTable<IFeedback>
        selectable
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={[...feedbackColumns, statusColumn]}
        paginatedData={feedbacks}
        onChange={refetchFeedbacks}
        onChangeSelected={handleChangeSelected}
      />
    </Box>
  );
};

export default Feedbacks;
