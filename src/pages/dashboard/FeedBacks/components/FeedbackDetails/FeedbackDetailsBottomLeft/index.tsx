import { feedbackDetailsBottomLeftTabsOptions } from "./constants";
import BasicTabs from "shared/ui/Tabs";
import { Box } from "@mui/material";

type Props = {};

const FeedbackDetailsBottomLeft = (props: Props) => {
  return (
    <Box sx={{ minHeight: 500 }}>
      <BasicTabs tabsData={feedbackDetailsBottomLeftTabsOptions} />
    </Box>
  );
};

export default FeedbackDetailsBottomLeft;
