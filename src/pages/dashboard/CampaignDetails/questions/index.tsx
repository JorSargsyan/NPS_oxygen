import { Box } from "@mui/system";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSibebar";

const Questions = () => {
  return (
    <Box display="flex" mt={2} minHeight={"100vh"}>
      <Box flex={1}>
        <LeftSidebar />
      </Box>
      <Box flex={3} mx={2} bgcolor={"blue"}>
        <MainContent />
      </Box>
      <Box flex={1} bgcolor={"green"}>
        <RightSidebar />
      </Box>
    </Box>
  );
};
export default Questions;
