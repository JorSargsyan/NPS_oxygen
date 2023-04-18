import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Grid, Paper, Typography } from "@mui/material";
import CheckList from "./CheckList";

const MysteryShopperDetails = () => {
  const { id } = useParams();

  const useCaseData = JSON.parse(localStorage.getItem("useCaseData"));
  const actualUseCase = useCaseData.find((i) => i.id === Number(id));

  return (
    <Box p={2}>
      <Box mb={2}>
        <Typography variant="h6" fontWeight={500} color="text.secondary">
          {actualUseCase?.video.title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Box component={Paper} p={2}>
            <CheckList actualUseCaseID={actualUseCase.caseId} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box component={Paper} p={2}>
            <ReactPlayer
              width="100%"
              height="450px"
              url={actualUseCase?.video.url}
              controls
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MysteryShopperDetails;
