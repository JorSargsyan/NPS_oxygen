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

  const getDashboardData = useCallback(
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
    await getDashboardData(dates);
  };

  const init = useCallback(async () => {
    const dates = [dayjs().subtract(1, "month"), dayjs()];
    methods.reset({
      range: dates,
    });
    await getDashboardData(dates);
  }, [dispatch, methods]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={4}>
      <Box component={Paper} elevation={3}>
        <FormProvider {...methods}>
          <Box display="flex" justifyContent="end" py={4}>
            <Box width="30%">
              <BasicRangePicker
                name="range"
                onSubmit={getFilteredDashboardStatistics}
              />
            </Box>
          </Box>
          <Card sx={{ width: "50%", ml: 2, p: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-around">
                <Box textAlign="center">
                  <Typography fontSize={18} fontWeight="bold">
                    Total Survey completed
                  </Typography>
                  <Typography fontSize={24} fontWeight="bold">
                    {deliveredData?.responded}
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography fontSize={18} fontWeight="bold">
                    Total response rate
                  </Typography>
                  <Typography fontSize={24} fontWeight="bold">
                    {deliveredData?.opened &&
                      deliveredData?.responded &&
                      (deliveredData?.opened / deliveredData?.responded) * 100}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" pt={4} justifyContent="space-between">
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
          <Box mt={5}>
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
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Dashboard;
