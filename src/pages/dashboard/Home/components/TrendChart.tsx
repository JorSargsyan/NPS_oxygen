import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { trendChartOptionsData } from "../constants";
import { Box, Card, CardContent, Typography } from "@mui/material";
import useTranslation from "shared/helpers/hooks/useTranslation";
import TrendChartIcon from "assets/icons/dashboard_group.svg";

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
            width="250px"
            alignItems={"center"}
            justifyContent="space-around"
            pb={2}
          >
            <img src={TrendChartIcon} alt="icon" />
            <Typography sx={{ color: "primary.defaultText", fontSize: 24 }}>
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
