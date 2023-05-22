import BasicTabs from "shared/ui/Tabs";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { EFeedbackDetailsBottomLeftTabsOptions } from "./constants";
import TabFeedbackComponent from "./TabFeedbackComponent";
import TabServiceComponent from "./TabServiceComponent";
// import TabSurveyComponent from "./TabSurveyComponent";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import usePermission from "shared/helpers/hooks/usePermission";

const FeedbackDetailsBottomLeft = () => {
  const hasFeedbackBottomLeftTabResponseViewPermission = usePermission(
    EFeedbackPermissions.View_response_tab
  );
  // const hasFeedbackBottomLeftSurveyTabViewPermission = usePermission(
  //   EFeedbackPermissions.View_survey_tab
  // );
  const hasFeedbackBottomLeftServiceCauseTabViewPermission = usePermission(
    EFeedbackPermissions.View_service_tab
  );

  const feedbackDetailsBottomLeftTabsOptions = useMemo(() => {
    return [
      ...(hasFeedbackBottomLeftTabResponseViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomLeftTabsOptions.Feedback,
              label: "response",
              children: <TabFeedbackComponent />,
            },
          ]
        : []),
      ...(hasFeedbackBottomLeftServiceCauseTabViewPermission
        ? [
            {
              index: EFeedbackDetailsBottomLeftTabsOptions.Service,
              label: "service",
              children: <TabServiceComponent />,
            },
          ]
        : []),
      // ...(hasFeedbackBottomLeftSurveyTabViewPermission
      //   ? [
      //       {
      //         index: EFeedbackDetailsBottomLeftTabsOptions.Survey,
      //         label: "Survey",
      //         children: <TabSurveyComponent />,
      //       },
      //     ]
      //   : []),
    ];
  }, [
    hasFeedbackBottomLeftServiceCauseTabViewPermission,
    hasFeedbackBottomLeftTabResponseViewPermission,
    // hasFeedbackBottomLeftSurveyTabViewPermission,
  ]);

  return (
    <Box sx={{ minHeight: 500 }}>
      <BasicTabs tabsData={feedbackDetailsBottomLeftTabsOptions} />
    </Box>
  );
};

export default FeedbackDetailsBottomLeft;
