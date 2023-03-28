import { Box } from "@mui/system";
import BasicTabs from "shared/ui/Tabs";
import { rightSidebarTabsData } from "./constants";

const RightSidebar = () => {
  return (
    <Box>
      <BasicTabs tabsData={rightSidebarTabsData} />
    </Box>
  );
};

export default RightSidebar;
