import {
  Box,
  Card,
  CardContent,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import BasicRangePicker from "shared/ui/RangePicker";
import {
  GetDashboardData,
  GetSurveyDeliveredData,
  selectDashboardData,
  selectDeliveredData,
} from "store/slicers/dashboard";
import { feedbackFilterTypesKeys } from "../FeedBacks/constants";
import ScoreCharts from "./components/ScoreCharts";
import TrendChart from "./components/TrendChart";
import { ECampaignSurveyType } from "../CampaignDetails/questions/LeftSidebar/constants";
import CompletedCount from "assets/icons/completed_surveys_rate.svg";
import CompletedRate from "assets/icons/completed_surveys_count.svg";
import useTranslation from "shared/helpers/hooks/useTranslation";

interface IFormData {
  range: Array<Dayjs | null>;
}

const Dashboard = () => {
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));
  const dashboardData = useSelector(selectDashboardData);
  const deliveredData = useSelector(selectDeliveredData);
  const dispatch = useAsyncDispatch();
  const t = useTranslation();
  const methods = useForm<IFormData>({
    defaultValues: {
      range: [null, null],
    },
  });

  const getFilteredDashboardData = useCallback(
    async (dates: Dayjs[]) => {
      if (dates) {
        const data = {
          filters: [
            {
              key: feedbackFilterTypesKeys.DATE,
              queryCondition: 4,
              value: dates?.[0].format("MM/DD/YYYY"),
            },
            {
              key: feedbackFilterTypesKeys.DATE,
              queryCondition: 5,
              value: dates?.[1].format("MM/DD/YYYY"),
            },
          ],
        };
        const dashboardDataReq = {
          ...data,
          userVisibility: 2,
        };

        await Promise.all([
          dispatch(GetSurveyDeliveredData(data)),
          dispatch(GetDashboardData(dashboardDataReq)),
        ]);
      }
    },
    [dispatch]
  );

  const getFilteredDashboardStatistics = async (dates: Dayjs[]) => {
    await getFilteredDashboardData(dates);
  };

  const init = useCallback(async () => {
    const dates = [dayjs().subtract(1, "month"), dayjs()];
    methods.reset({
      range: dates,
    });
    await getFilteredDashboardData(dates);
  }, [methods, getFilteredDashboardData]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box>
      <Box>
        <FormProvider {...methods}>
          <Box
            display="flex"
            px={2}
            pt={2}
            alignItems={lgUp ? "center" : " left"}
            flexDirection={lgUp ? "row" : "column"}
          >
            <Box flex={3}>
              <Typography
                mb={1}
                variant="h4"
                fontWeight={500}
                color="text.secondary"
              >
                {t("overview_section_title")}
              </Typography>
            </Box>
            <Box flex={1}>
              <BasicRangePicker
                name="range"
                onSubmit={getFilteredDashboardStatistics}
              />
            </Box>
          </Box>
          <Box mx={2} gap={4} display="flex" py={2} flexWrap={"wrap"}>
            <Box flex={1}>
              <Card sx={{ minHeight: 133 }}>
                <CardContent>
                  {deliveredData && (
                    <Box display="flex" justifyContent="space-around">
                      <Box display="flex">
                        <img src={CompletedRate} alt="rate" />
                        <Box ml={1}>
                          <Typography fontSize={14}>
                            {t("overview_surveys_completed")}
                          </Typography>
                          <Typography fontSize={32}>
                            {deliveredData?.responded}
                          </Typography>
                        </Box>
                      </Box>
                      <Box display="flex">
                        <img src={CompletedCount} alt="count" />
                        <Box ml={1}>
                          <Typography fontSize={14}>
                            {t("overview_response_rate")}
                          </Typography>
                          <Typography fontSize={32}>
                            {deliveredData?.opened &&
                              deliveredData?.responded &&
                              Math.floor(
                                (deliveredData?.responded /
                                  deliveredData?.opened) *
                                  100
                              )}
                            %
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
            <Box flex={1}>
              <Card sx={{ padding: "5px", minHeight: 133 }}>
                <CardContent>
                  {deliveredData && (
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography fontSize={14}>
                          {t("overview_sent")}
                        </Typography>
                        <Typography
                          fontSize={32}
                          sx={{ lineHeight: "38px", color: "#007AFF" }}
                        >
                          {deliveredData?.sent}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={14}>
                          {t("overview_delivered")}
                        </Typography>
                        <Typography
                          fontSize={32}
                          sx={{ lineHeight: "38px", color: "#643DC7" }}
                        >
                          {deliveredData?.delivered}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={14}>
                          {t("overview_opened")}
                        </Typography>
                        <Typography
                          fontSize={32}
                          sx={{ lineHeight: "38px", color: "#A13AC6" }}
                        >
                          {deliveredData?.opened}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography fontSize={14}>
                          {t("overview_bounced")}
                        </Typography>
                        <Typography
                          fontSize={32}
                          sx={{ lineHeight: "38px", color: "#DD3A97" }}
                        >
                          {deliveredData?.bounced}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box>
            {dashboardData?.nps && (
              <ScoreCharts
                label={t("dashboard_nps_key")}
                dashboardDataChopChart={dashboardData?.npsChopChart}
                scoreData={dashboardData?.nps}
                type={ECampaignSurveyType.Nps}
              />
            )}
            {dashboardData?.friendliness && (
              <ScoreCharts
                label={t("dashboard_friendliness_key")}
                dashboardDataChopChart={dashboardData?.friendlinessChopChart}
                scoreData={dashboardData?.friendliness}
                type={ECampaignSurveyType.ServiceQualityScore}
              />
            )}
            {dashboardData?.effortScore && (
              <ScoreCharts
                label={t("dashboard_effort_key")}
                dashboardDataChopChart={dashboardData?.effortScoreChopChart}
                scoreData={dashboardData?.effortScore}
                type={ECampaignSurveyType.CustomerEffortScore}
              />
            )}

            {dashboardData?.satisfactionScore && (
              <ScoreCharts
                label={t("dashboard_satisfaction_key")}
                dashboardDataChopChart={
                  dashboardData?.satisfactionScoreChopChart
                }
                scoreData={dashboardData?.satisfactionScore}
                type={ECampaignSurveyType.CustomerSatisfactionScore}
              />
            )}
            <TrendChart chartsData={dashboardData?.lineChartData} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Dashboard;
