import React from "react";
import ReactApexChart from "react-apexcharts";
import { trendChartOptionsData } from "../constants";
import { Box, Card, CardContent } from "@mui/material";

const TrendChart = ({ chartsData }) => {
  return (
    <Box m={2}>
      <Card>
        <CardContent>
          {chartsData && (
            <ReactApexChart
              options={trendChartOptionsData}
              series={chartsData}
              type="area"
              height="380px"
              width="100%"
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TrendChart;
