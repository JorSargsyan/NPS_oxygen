import { feedbackDetailsBottomRightTabsOptions } from "./constants";
import BasicTabs from "shared/ui/Tabs";
import { Box } from "@mui/system";

type Props = {};

const FeedbackDetailsBottomRight = (props: Props) => {
  return (
    <Box sx={{ minHeight: 400 }}>
      <BasicTabs tabsData={feedbackDetailsBottomRightTabsOptions} />
    </Box>
  );
};

export default FeedbackDetailsBottomRight;
