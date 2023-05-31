import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { Box, Theme } from "@mui/system";
import { IScoreValues } from "store/interfaces/dashboard";
import ColumnsChart from "./ColumnChart";
import PieChart from "./PieChart";
import { ECampaignSurveyType } from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { useMemo } from "react";
import { DashboardIcons } from "../constants";

type Props = {
  dashboardDataChopChart: { key: number; value: number }[];
  scoreData: IScoreValues;
  label: string;
  type: ECampaignSurveyType;
};

const colors = {
  [ECampaignSurveyType.Nps]: ["#A13AC6", "#DD3A97", "#643DC7"],
  [ECampaignSurveyType.ServiceQualityScore]: ["#B7CA39", "#50C2B5", "#1B7FFC"],
  [ECampaignSurveyType.CustomerEffortScore]: ["#F0F1AD", "#5DC66A", "#6443C5"],
  [ECampaignSurveyType.CustomerSatisfactionScore]: [
    "#A6DDFE",
    "#CEBCEC",
    "#CD8BDF",
  ],
};

const labels = {
  [ECampaignSurveyType.Nps]: ["Detractors", "Passives", "Promoters"],
  [ECampaignSurveyType.ServiceQualityScore]: [
    "Detractors",
    "Passives",
    "Promoters",
  ],
  [ECampaignSurveyType.CustomerEffortScore]: ["Disagree", "Undecided", "Agree"],
  [ECampaignSurveyType.CustomerSatisfactionScore]: [
    "Unsatisfied",
    "Neutral",
    "Satisfied",
  ],
};

const ScoreCharts = ({
  dashboardDataChopChart,
  scoreData,
  label,
  type,
}: Props) => {
  const smUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  const getOptionIcon = (type: string) => {
    const Comp = DashboardIcons[type];
    return (
      <Box display="flex" p={1} alignItems="center">
        <img src={Comp} alt="dashboard-icon" />
      </Box>
    );
  };

  const series = useMemo(() => {
    if (scoreData) {
      return [
        scoreData?.badCount || 0,
        scoreData?.ordinaryCount || 0,
        scoreData?.goodCount || 0,
      ];
    }
  }, [scoreData]);

  return (
    <Card sx={{ m: 2, minHeight: 485 }}>
      <CardContent>
        {scoreData ? (
          <>
            <Box
              sx={{
                color: "white",
                borderRadius: "8px",
              }}
            >
              <Box
                borderRadius={"4px"}
                pr={1}
                width={100}
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
              >
                {getOptionIcon(type)}
                <Typography sx={{ color: "primary.defaultText", fontSize: 24 }}>
                  {label}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              gap={1}
              flexDirection={smUp ? "row" : "column"}
              alignItems="center"
              flexWrap="wrap"
            >
              <Box flex={3}>
                <PieChart
                  chartData={scoreData}
                  label={label}
                  series={series}
                  colors={colors[type]}
                  labels={labels[type]}
                />
              </Box>
              <Box flex={4}>
                <ColumnsChart
                  type={type}
                  series={dashboardDataChopChart}
                  label={label}
                />
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
