import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  customerMoodValues,
  feedbackStatusValues,
} from "pages/dashboard/FeedBacks/constants";
import { useCallback, useEffect, useState } from "react";
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

const skeletonArr = new Array(3).fill("");

const TabHistoryComponent = () => {
  const { id } = useParams();
  const feedbackLogs = useSelector(selectFeedbackLogs);
  const [isDataLoaded, setDataLoaded] = useState(false);

  const dispatch = useAsyncDispatch();

  const init = useCallback(async () => {
    setDataLoaded(false);
    await dispatch(GetFeedbackLogs(id));
    setDataLoaded(true);
  }, [id, dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box sx={{ overflowY: "scroll", p: 3, maxHeight: 700 }}>
      {feedbackLogs?.length ? (
        <FeedBackSharedHistoryComponent<IFeedbackLog>
          list={feedbackLogs}
          children={FeedbackHistoryLogsText}
        />
      ) : !isDataLoaded ? (
        skeletonArr.map((i, index) => {
          return (
            <Skeleton
              sx={{ mb: 3 }}
              key={index}
              variant="rounded"
              animation="wave"
              width="100%"
              height="118px"
            />
          );
        })
      ) : (
        <NoData description="There is no history" />
      )}
    </Box>
  );
};

export default TabHistoryComponent;
