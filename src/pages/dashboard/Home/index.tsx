import { Paper, Box, Card, CardContent, Typography } from "@mui/material";
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

interface IFormData {
  range: Array<Dayjs | null>;
}

const Dashboard = () => {
  const dashboardData = useSelector(selectDashboardData);
  const deliveredData = useSelector(selectDeliveredData);
  const dispatch = useAsyncDispatch();
  const methods = useForm<IFormData>({
    defaultValues: {
      range: [null, null],
    },
  });

  const getFilteredDashboardData = useCallback(
    async (dates: Dayjs[]) => {
      const data = {
        filters: [
          {
            key: feedbackFilterTypesKeys.DATE,
            queryCondition: 4,
            value: dates[0].format("MM/DD/YYYY"),
          },
          {
            key: feedbackFilterTypesKeys.DATE,
            queryCondition: 5,
            value: dates[1].format("MM/DD/YYYY"),
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
          <Box mx={2} gap={4} display="flex" py={2}>
            <Box flex={1}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-around">
                    <Box textAlign="center">
                      <Typography fontSize={18} fontWeight="bold">
                        Survey completed
                      </Typography>
                      <Typography fontSize={24} fontWeight="bold">
                        {deliveredData?.responded}
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography fontSize={18} fontWeight="bold">
                        Response rate
                      </Typography>
                      <Typography fontSize={24} fontWeight="bold">
                        {deliveredData?.opened &&
                          deliveredData?.responded &&
                          Math.floor(
                            (deliveredData?.responded / deliveredData?.opened) *
                              100
                          )}
                        %
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box flex={1}>
              <BasicRangePicker
                name="range"
                onSubmit={getFilteredDashboardStatistics}
              />
            </Box>
          </Box>

          <Box mx={2}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Box textAlign="center">
                    <Typography fontSize={14} fontWeight="bold">
                      Sent
                    </Typography>
                    <Typography fontSize={20} fontWeight="bold">
                      {deliveredData?.sent}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography fontSize={14} fontWeight="bold">
                      Delivered
                    </Typography>
                    <Typography fontSize={20} fontWeight="bold">
                      {deliveredData?.delivered}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography fontSize={14} fontWeight="bold">
                      Opened
                    </Typography>
                    <Typography fontSize={20} fontWeight="bold">
                      {deliveredData?.opened}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography fontSize={14} fontWeight="bold">
                      Bounced
                    </Typography>
                    <Typography fontSize={20} fontWeight="bold">
                      {deliveredData?.bounced}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <ScoreCharts
              label="NPS"
              dashboardDataChopChart={dashboardData?.npsChopChart}
              scoreData={dashboardData?.nps}
            />
            <ScoreCharts
              label="Friendliness"
              dashboardDataChopChart={dashboardData?.friendlinessChopChart}
              scoreData={dashboardData?.friendliness}
            />
            <ScoreCharts
              label="CES"
              dashboardDataChopChart={dashboardData?.effortScoreChopChart}
              scoreData={dashboardData?.effortScore}
            />
            <ScoreCharts
              label="CSAT"
              dashboardDataChopChart={dashboardData?.satisfactionScoreChopChart}
              scoreData={dashboardData?.satisfactionScore}
            />
            <TrendChart chartsData={dashboardData?.lineChartData} />
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Dashboard;
