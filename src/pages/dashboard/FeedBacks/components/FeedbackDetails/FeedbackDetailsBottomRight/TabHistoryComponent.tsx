import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { IFeedbackLog } from "store/interfaces/feedback";
import { GetFeedbackLogs, selectFeedbackLogs } from "store/slicers/feedback";
import FeedBackSharedHistoryComponent from "./FeedbackSharedHistory";

const FeedbackHistoryLogsText = (item: IFeedbackLog) => {};

const TabHistoryComponent = () => {
  const { id } = useParams();
  const feedbackLogs = useSelector(selectFeedbackLogs);

  const dispatch = useAsyncDispatch();
  useEffect(() => {
    dispatch(GetFeedbackLogs(id));
  }, []);

  return (
    <Box>
      <FeedBackSharedHistoryComponent<IFeedbackLog> list={feedbackLogs} />
    </Box>
  );
};

export default TabHistoryComponent;
