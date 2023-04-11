import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IScoreValues } from "store/interfaces/dashboard";
import ColumnsChart from "./ColumnChart";
import RadialBar from "./RadialBar";
import PieChart from "./PieChart";

type Props = {
  dashboardDataChopChart: { key: number; value: number }[];
  scoreData: IScoreValues;
  label: string;
};

const ScoreCharts = ({ dashboardDataChopChart, scoreData, label }: Props) => {
  return (
    <Card sx={{ m: 2, minHeight: 485 }}>
      <CardContent>
        {scoreData ? (
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
              <Typography fontWeight={"bold"}>{label}</Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Box
                flex={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={5}
              >
                <RadialBar series={[scoreData?.score]} label={label} />
              </Box>
              <Box flex={2}>
                <PieChart chartData={scoreData} />
              </Box>
              <Box flex={4}>
                <ColumnsChart series={dashboardDataChopChart} label={label} />
              </Box>
            </Box>
          </>
        ) : (
          <div />
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreCharts;
