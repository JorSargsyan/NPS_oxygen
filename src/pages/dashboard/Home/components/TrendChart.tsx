import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { trendChartOptionsData } from "../constants";
import { Box, Card, CardContent, Typography } from "@mui/material";
import useTranslation from "shared/helpers/hooks/useTranslation";

const TrendChart = ({ chartsData }) => {
  const t = useTranslation();

  const chartsDataTranslated = useMemo(() => {
    if (!chartsData?.length) {
      return [];
    }
    return [...chartsData].map((item) => {
      return {
        ...item,
        name: t(item.name),
      };
    });
  }, [chartsData, t]);

  return (
    <Box m={2}>
      <Card>
        <CardContent>
          <Box
            sx={{
              backgroundColor: "neutral.100",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              mb: 2,
            }}
          >
            <Typography fontWeight={"bold"} color="text.secondary">
              Trend chart title
            </Typography>
          </Box>
          {chartsData && (
            <ReactApexChart
              options={trendChartOptionsData}
              series={chartsDataTranslated}
              type="line"
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
