import { Box } from "@mui/system";
import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import { Paper } from "@mui/material";

const Questions = () => {
  return (
    <Box display="flex" pt={2}>
      <Box
        flex={2}
        component={Paper}
        elevation={4}
        maxHeight="90vh"
        sx={{ overflowY: "scroll" }}
      >
        <LeftSidebar />
      </Box>
      <Box flex={4} mx={2}>
        <MainContent />
      </Box>
      <Box
        flex={2}
        component={Paper}
        elevation={4}
        maxHeight="90vh"
        sx={{ overflowY: "scroll" }}
      >
        <RightSidebar />
      </Box>
    </Box>
  );
};
export default Questions;
