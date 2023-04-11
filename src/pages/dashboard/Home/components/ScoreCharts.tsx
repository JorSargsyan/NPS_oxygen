import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IScoreValues } from "store/interfaces/dashboard";
import ColumnsChart from "./ColumnChart";
import RadialBar from "./RadialBar";

type Props = {
  dashboardDataChopChart: { key: number; value: number }[];
  scoreData: IScoreValues;
  label: string;
};

const ScoreCharts = ({ dashboardDataChopChart, scoreData, label }: Props) => {
  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <>
          <Box
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            {label}
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              width="48%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={5}
            >
              <RadialBar series={[scoreData?.score]} label={label} />

              <Box>
                <Typography>Bad count: {scoreData?.badCount}</Typography>
                <Typography>
                  Neutral count: {scoreData?.ordinaryCount}
                </Typography>
                <Typography>Good count: {scoreData?.goodCount}</Typography>
              </Box>
            </Box>
            <Box width="48%">
              <ColumnsChart series={dashboardDataChopChart} label={label} />
            </Box>
          </Box>
        </>
      </CardContent>
    </Card>
  );
};

export default ScoreCharts;
