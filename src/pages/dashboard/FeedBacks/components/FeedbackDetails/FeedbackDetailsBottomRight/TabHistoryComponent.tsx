import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  customerMoodValues,
  feedbackStatusValues,
} from "pages/dashboard/FeedBacks/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { IFeedbackLog } from "store/interfaces/feedback";
import { GetFeedbackLogs, selectFeedbackLogs } from "store/slicers/feedback";
import NoData from "../../NoData";
import { EFeedbackLogTypes } from "./constants";
import FeedBackSharedHistoryComponent from "./FeedbackSharedHistory";

const FeedbackHistoryLogsText = (item: IFeedbackLog) => {
  return (
    <Box>
      {item.logType === EFeedbackLogTypes.Assign && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Assigned the feedback to{" "}
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {item.assignUser}
          </Typography>
        </Box>
      )}
      {item.logType === EFeedbackLogTypes.Unassign && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Unassigned the feedback from
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {item.assignUser}
          </Typography>
        </Box>
      )}
      {item.logType === EFeedbackLogTypes.Status && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Changed the status to{" "}
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {feedbackStatusValues[item.status]}
          </Typography>
        </Box>
      )}
      {item.logType === EFeedbackLogTypes.Cause && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Changed the cause category to
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {item.cause}
          </Typography>
        </Box>
      )}
      {item.logType === EFeedbackLogTypes.Root && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Changed the root cause to
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {item.root}
          </Typography>
        </Box>
      )}
      {item.logType === EFeedbackLogTypes.Mood && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          Changed the customer mood
          <Typography
            sx={{ color: "warning.main", fontSize: 14, marginLeft: "4px" }}
          >
            {customerMoodValues[item?.mood as string]}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const TabHistoryComponent = () => {
  const { id } = useParams();
  const feedbackLogs = useSelector(selectFeedbackLogs);

  const dispatch = useAsyncDispatch();
  useEffect(() => {
    dispatch(GetFeedbackLogs(id));
  }, [dispatch, id]);

  return (
    <Box p={2}>
      {feedbackLogs?.length ? (
        <FeedBackSharedHistoryComponent<IFeedbackLog>
          list={feedbackLogs}
          children={FeedbackHistoryLogsText}
        />
      ) : (
        <NoData description="There is no history" />
      )}
    </Box>
  );
};

export default TabHistoryComponent;
