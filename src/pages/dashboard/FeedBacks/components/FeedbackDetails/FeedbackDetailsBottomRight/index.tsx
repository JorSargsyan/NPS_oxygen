import BasicTabs from "shared/ui/Tabs";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { EFeedbackDetailsBottomRightTabsOptions } from "./constants";
import TabHistoryComponent from "./TabHistoryComponent";
import TabNotesComponent from "./TabNotesComponent";
import TabRedirectionComponent from "./TabRedirectionComponent";
import TabRootCauseComponent from "./TabRootCauseComponent";
import usePermission from "shared/helpers/hooks/usePermission";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";

type Props = {};

const FeedbackDetailsBottomRight = (props: Props) => {
  const hasFeedbackBottomRightNoteTabViewPermission = usePermission(
    EFeedbackPermissions.View_notes_tab
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

  const feedbackDetailsBottomRightTabsOptions = useMemo(() => {
    return [
      ...(hasFeedbackBottomRightNoteTabViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomRightTabsOptions.Notes,
              label: "notes",
              children: <TabNotesComponent />,
            },
          ]
        : []),
      ...(hasFeedbackBottomRightTaskTabViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomRightTabsOptions.Redirection,
              label: "redirection",
              children: <TabRedirectionComponent />,
            },
          ]
        : []),
      ...(hasFeedbackBottomRightRootCauseTabViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomRightTabsOptions.Root_cause,
              label: "root_cause",
              children: <TabRootCauseComponent />,
            },
          ]
        : []),
      ...(hasFeedbackBottomRightHistoryTabViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomRightTabsOptions.History,
              label: "history",
              children: <TabHistoryComponent />,
            },
          ]
        : []),
    ];
  }, [
    hasFeedbackBottomRightHistoryTabViewPermission,
    hasFeedbackBottomRightRootCauseTabViewPermission,
    hasFeedbackBottomRightTaskTabViewPermission,
    hasFeedbackBottomRightNoteTabViewPermission,
  ]);

  return (
    <Box sx={{ minHeight: 500 }}>
      <BasicTabs tabsData={feedbackDetailsBottomRightTabsOptions} />
    </Box>
  );
};

export default FeedbackDetailsBottomRight;
