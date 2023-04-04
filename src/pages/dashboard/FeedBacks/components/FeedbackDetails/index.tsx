import { Box, Paper } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import usePermission from "shared/helpers/hooks/usePermission";
import { GetUserManagers } from "store/slicers/common";
import { GetFeedbackDetail, GetFeedbackNotes } from "store/slicers/feedback";
import FeedbackDetailsBottomLeft from "./FeedbackDetailsBottomLeft";
import FeedbackDetailsBottomRight from "./FeedbackDetailsBottomRight";
import FeedbackDetailsTop from "./FeedbackDetailsTop";

const FeedbackDetails = () => {
  const params = useParams();
  const dispatch = useAsyncDispatch();

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

  const init = useCallback(() => {
    const id = Number(params.id);
    Promise.all([
      dispatch(GetFeedbackDetail(id)),
      dispatch(GetUserManagers()),
      ...(hasFeedbackBottomRightNoteTabViewPermission
        ? [dispatch(GetFeedbackNotes(id))]
        : []),
    ]);
  }, [params.id, dispatch, hasFeedbackBottomRightNoteTabViewPermission]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box padding={4}>
      {hasFeedbackBottomTopComponentViewPermission && <FeedbackDetailsTop />}

      <Box display="flex" gap={6} pt={3}>
        {hasFeedbackBottomLeftTabResponseViewPermission &&
          hasFeedbackBottomLeftSurveyTabViewPermission &&
          hasFeedbackBottomLeftServiceCauseTabViewPermission && (
            <Box flex={1}>
              <Paper elevation={3}>
                <FeedbackDetailsBottomLeft />
              </Paper>
            </Box>
          )}

        {hasFeedbackBottomRightHistoryTabViewPermission &&
          hasFeedbackBottomRightRootCauseTabViewPermission &&
          hasFeedbackBottomRightTaskTabViewPermission &&
          hasFeedbackBottomRightNoteTabViewPermission && (
            <Box flex={1}>
              <Paper elevation={3}>
                <FeedbackDetailsBottomRight />
              </Paper>
            </Box>
          )}
      </Box>
    </Box>
  );
};

export default FeedbackDetails;
