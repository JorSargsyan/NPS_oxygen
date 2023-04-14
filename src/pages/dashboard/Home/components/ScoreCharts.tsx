import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IScoreValues } from "store/interfaces/dashboard";
import ColumnsChart from "./ColumnChart";
import PieChart from "./PieChart";
import {
  CampaignSurveyIcons,
  ECampaignSurveyType,
} from "pages/dashboard/CampaignDetails/questions/LeftSidebar/constants";
import { useMemo } from "react";

type Props = {
  dashboardDataChopChart: { key: number; value: number }[];
  scoreData: IScoreValues;
  label: string;
  type: ECampaignSurveyType;
};

const ScoreCharts = ({
  dashboardDataChopChart,
  scoreData,
  label,
  type,
}: Props) => {
  const getOptionIcon = (type: string) => {
    const Comp = CampaignSurveyIcons[type];
    return (
      <Box display="flex" p={1} alignItems="center">
        <Comp height={20} width={20} color="white" />
      </Box>
    );
  };

  const scoreColor = useMemo(() => {
    let color = "";
    switch (type) {
      case ECampaignSurveyType.Nps:
        color = "#369BFD";
        break;
      case ECampaignSurveyType.ServiceQualityScore:
        color = "#B663D2";
        break;
      case ECampaignSurveyType.CustomerEffortScore:
        color = "#8767D2";
        break;
      case ECampaignSurveyType.CustomerSatisfactionScore:
        color = "#50C2B5";
        break;
    }
    return color;
  }, [type]);

  return (
    <Card sx={{ m: 2, minHeight: 485 }}>
      <CardContent>
        {scoreData ? (
          <>
            <Box
              sx={{
                backgroundColor: "neutral.100",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <Box
                borderRadius={"4px"}
                pr={1}
                width={100}
                display="flex"
                alignItems={"center"}
                justifyContent="space-between"
                sx={{ backgroundColor: scoreColor }}
              >
                {getOptionIcon(type)}
                <Typography>{label}</Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Box flex={3}>
                <PieChart chartData={scoreData} label={label} />
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
