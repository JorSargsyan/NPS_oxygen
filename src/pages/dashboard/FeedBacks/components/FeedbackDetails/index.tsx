import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { GetUserManagers } from "store/slicers/common";
import { GetFeedbackDetail, GetFeedbackNotes } from "store/slicers/feedback";
import FeedbackDetailsBottomLeft from "./FeedbackDetailsBottomLeft";
import FeedbackDetailsBottomRight from "./FeedbackDetailsBottomRight";
import FeedbackDetailsTop from "./FeedbackDetailsTop";

type Props = {};

const FeedbackDetails = (props: Props) => {
  const params = useParams();
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    const id = Number(params.id);
    Promise.all([
      dispatch(GetFeedbackDetail(id)),
      dispatch(GetUserManagers()),
      dispatch(GetFeedbackNotes(id)),
    ]);
  }, [params.id, dispatch]);

  return (
    <Box padding={4}>
      <FeedbackDetailsTop />
      <Box display="flex" gap={6} pt={3}>
        <Box flex={1}>
          <Paper elevation={3}>
            <FeedbackDetailsBottomLeft />
          </Paper>
        </Box>
        <Box flex={1}>
          <Paper elevation={3}>
            <FeedbackDetailsBottomRight />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackDetails;
