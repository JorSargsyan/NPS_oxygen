import { Box } from "@mui/system";
import BasicTabs from "shared/ui/Tabs";
import { leftSidebarTabsData } from "./constants";

const LeftSidebar = () => {
  return (
    <Box>
      <BasicTabs tabsData={leftSidebarTabsData} />
    </Box>
  );
};

export default LeftSidebar;
