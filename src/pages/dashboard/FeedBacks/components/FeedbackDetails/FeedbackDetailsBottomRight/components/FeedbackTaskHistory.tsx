import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { DATE_FORMAT } from "store/config/constants";
import { IFeedbackTaskLog } from "store/interfaces/feedback";
import { selectFeedbackTaskLogs } from "store/slicers/feedback";
import { ERedirectTabStatusesValues } from "../constants";
import FeedBackSharedHistoryComponent from "../FeedbackSharedHistory";

type Props = {};

const FeedbackTaskLogsText = (item: IFeedbackTaskLog) => {
  return (
    <Fragment>
      {item?.status && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography sx={{ fontSize: 14 }}>
            {item?.user?.name} {item?.user?.surname}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>changed the status from</Typography>
          <Typography sx={{ fontSize: 14, color: "info.main" }}>
            {ERedirectTabStatusesValues[item.status]}
          </Typography>
        </Box>
      )}
      {item?.directorateAttachedEmployee && (
        <Box
          sx={{
            "& span": {
              color: "info.main",
            },
          }}
        >
          {item?.user?.name} {item?.user?.surname} redirected the feedback to{" "}
          <span>"{item.directorate}"</span> and informed{" "}
          <span>"{item.directorateAttachedEmployee}"</span>
        </Box>
      )}
      {item?.deadline && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography sx={{ fontSize: 14 }}>
            {item?.user?.name} {item?.user?.surname}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            changed the deadline from
          </Typography>
          <Typography sx={{ fontSize: 14, color: "info.main" }}>
            {format(new Date(item.deadline), DATE_FORMAT)}
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

const FeedbackTaskHistory = (props: Props) => {
  const feedbackTaskLogs = useSelector(selectFeedbackTaskLogs);
  return (
    <FeedBackSharedHistoryComponent<IFeedbackTaskLog>
      list={feedbackTaskLogs || []}
      children={FeedbackTaskLogsText}
    />
  );
};

export default FeedbackTaskHistory;
