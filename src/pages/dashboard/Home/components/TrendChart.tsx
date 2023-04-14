import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { trendChartOptionsData } from "../constants";
import ChartIcon from "@heroicons/react/24/outline/ChartBarIcon";
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
            borderRadius={"4px"}
            display="flex"
            width="190px"
            alignItems={"center"}
            justifyContent="space-around"
            sx={{ backgroundColor: "primary.darkest", padding: "8px" }}
          >
            <ChartIcon height={20} width={20} color="white" />
            <Typography fontWeight={"bold"} color="white">
              Compare metrics
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
