import { Box, Paper, Skeleton, Typography } from "@mui/material";
import {
  feedbackStatusList,
  IFeedbackStatusList,
} from "pages/dashboard/FeedBacks/constants";
import { Fragment, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import BasicSelect from "shared/ui/Select";
import { IManagerUser } from "store/interfaces/common";
import { selectManagers } from "store/slicers/common";
import { selectFeedbackDetails } from "store/slicers/feedback";

type Props = {};

interface IFormData {
  feedbackStatus: number;
  manager: number;
}

const FeedbackDetailsTop = (props: Props) => {
  const methods = useForm<IFormData>();
  const feedbackItemDetails = useSelector(selectFeedbackDetails);
  const managersList = useSelector(selectManagers);

  useEffect(() => {
    methods.reset({
      feedbackStatus: feedbackItemDetails?.status,
    });
  }, [feedbackItemDetails?.status, methods]);

  return (
    <FormProvider {...methods}>
      {feedbackItemDetails ? (
        <Paper elevation={3}>
          <Box p={2}>
            <Box display="flex">
              <Box width="30%" mr={5}>
                <BasicSelect<IFeedbackStatusList>
                  name="feedbackStatus"
                  defaultValue={""}
                  label="Feedback status"
                  valueProp="value"
                  labelProp="name"
                  options={feedbackStatusList}
                />
              </Box>
              <Box width="30%">
                <BasicSelect<IManagerUser>
                  name="manager"
                  defaultValue={""}
                  label="Manager"
                  valueProp="id"
                  labelProp="label"
                  options={managersList?.[0]?.users || []}
                />
              </Box>
            </Box>
            <Box display="flex" mt={4}>
              <Box width="30%" mr={5}>
                {feedbackItemDetails.customerName ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Customer
                    </Typography>
                    <Typography mb={2}>
                      {feedbackItemDetails.customerName}
                    </Typography>
                  </Fragment>
                ) : null}
                {feedbackItemDetails.customerPhone ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Phone number
                    </Typography>
                    <Typography mb={2}>
                      {feedbackItemDetails.customerPhone}
                    </Typography>
                  </Fragment>
                ) : null}
                {feedbackItemDetails.customerEmail ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Email Address
                    </Typography>
                    <Typography mb={2}>
                      {feedbackItemDetails.customerEmail}
                    </Typography>
                  </Fragment>
                ) : null}
              </Box>
              <Box width="30%">
                {feedbackItemDetails.id ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Feedback ID
                    </Typography>
                    <Typography mb={2}>{feedbackItemDetails.id}</Typography>
                  </Fragment>
                ) : null}
                {feedbackItemDetails.customerEmail ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Campaign
                    </Typography>
                    <Typography mb={2}>
                      {feedbackItemDetails.campaignName}
                    </Typography>
                  </Fragment>
                ) : null}
                {feedbackItemDetails.customerEmail ? (
                  <Fragment>
                    <Typography fontSize={14} fontWeight="bold" mb={1}>
                      Submitted
                    </Typography>
                    <Typography mb={2}>
                      {feedbackItemDetails.submittedDate}
                    </Typography>
                  </Fragment>
                ) : null}
              </Box>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Skeleton sx={{ minHeight: 90 }} animation="wave" />
      )}
    </FormProvider>
  );
};

export default FeedbackDetailsTop;
