import { Box, Paper, Skeleton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import usePermission from "shared/helpers/hooks/usePermission";
import { GetFeedbackDetail, GetFeedbackNotes } from "store/slicers/feedback";
import FeedbackDetailsBottomLeft from "./FeedbackDetailsBottomLeft";
import FeedbackDetailsBottomRight from "./FeedbackDetailsBottomRight";
import FeedbackDetailsTop from "./FeedbackDetailsTop";

const FeedbackDetails = () => {
  const params = useParams();
  const dispatch = useAsyncDispatch();
  const [isLoading, setLoading] = useState(true);

  const hasFeedbackBottomRightNoteTabViewPermission = usePermission(
    EFeedbackPermissions.View_notes_tab
  );
  const hasFeedbackBottomTopComponentViewPermission = usePermission(
    EFeedbackPermissions.View_feedback_card_top_component
  );
  const hasFeedbackBottomRightTaskTabViewPermission = usePermission(
    EFeedbackPermissions.View_tasks_tab
  );
  const hasFeedbackBottomRightRootCauseTabViewPermission = usePermission(
    EFeedbackPermissions.View_root_cause_tab
  );
  const hasFeedbackBottomRightHistoryTabViewPermission = usePermission(
    EFeedbackPermissions.View_history_tab
  );
  const hasFeedbackBottomLeftTabResponseViewPermission = usePermission(
    EFeedbackPermissions.View_response_tab
  );
  const hasFeedbackBottomLeftSurveyTabViewPermission = usePermission(
    EFeedbackPermissions.View_survey_tab
  );
  const hasFeedbackBottomLeftServiceCauseTabViewPermission = usePermission(
    EFeedbackPermissions.View_service_tab
  );

  const init = useCallback(async () => {
    setLoading(true);
    const id = Number(params.id);
    await Promise.all([
      dispatch(GetFeedbackDetail(id)),
      // dispatch(GetUserManagers()),
      ...(hasFeedbackBottomRightNoteTabViewPermission
        ? [dispatch(GetFeedbackNotes(id))]
        : []),
    ]);
    setLoading(false);
  }, [params.id, dispatch, hasFeedbackBottomRightNoteTabViewPermission]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box padding={4}>
      {hasFeedbackBottomTopComponentViewPermission ? (
        !isLoading ? (
          <Paper elevation={3}>
            <FeedbackDetailsTop />
          </Paper>
        ) : (
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height="470px"
          />
        )
      ) : null}

      <Box display="flex" gap={6} pt={3}>
        {hasFeedbackBottomLeftTabResponseViewPermission &&
        hasFeedbackBottomLeftSurveyTabViewPermission &&
        hasFeedbackBottomLeftServiceCauseTabViewPermission ? (
          !isLoading ? (
            <Box flex={1}>
              <Paper elevation={3}>
                <FeedbackDetailsBottomLeft />
              </Paper>
            </Box>
          ) : (
            <Skeleton
              variant="rounded"
              animation="wave"
              width="48%"
              height="470px"
            />
          )
        ) : null}

        {hasFeedbackBottomRightHistoryTabViewPermission &&
        hasFeedbackBottomRightRootCauseTabViewPermission &&
        hasFeedbackBottomRightTaskTabViewPermission &&
        hasFeedbackBottomRightNoteTabViewPermission ? (
          !isLoading ? (
            <Box flex={1}>
              <Paper elevation={3}>
                <FeedbackDetailsBottomRight />
              </Paper>
            </Box>
          ) : (
            <Skeleton
              variant="rounded"
              animation="wave"
              width="48%"
              height="470px"
            />
          )
        ) : null}
      </Box>
    </Box>
  );
};

export default FeedbackDetails;
