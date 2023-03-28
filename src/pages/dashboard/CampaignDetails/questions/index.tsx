import { Box } from "@mui/system";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";

const Questions = () => {
  return (
    <Box display="flex" mt={2} minHeight={"100vh"}>
      <Box flex={1}>
        <LeftSidebar />
      </Box>
      <Box flex={4} mx={2}>
        <MainContent />
      </Box>
      <Box flex={1}>
        <RightSidebar />
      </Box>
    </Box>
  );
};
export default Questions;
