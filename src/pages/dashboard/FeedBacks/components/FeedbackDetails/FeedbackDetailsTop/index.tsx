import { Box, Paper, Typography } from "@mui/material";
import { IActiveRow } from "pages/dashboard/FeedBacks";
import {
  feedbackStatusList,
  IFeedbackStatusList,
} from "pages/dashboard/FeedBacks/constants";
import { changeFeedbackStatus } from "pages/dashboard/FeedBacks/helpers";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import RightDrawer from "shared/ui/Drawer";
import BasicSelect from "shared/ui/Select";
import { ERequestStatus } from "store/enums/index.enum";
import { IManagerUser } from "store/interfaces/common";
import { selectManagers } from "store/slicers/common";
import {
  GetFeedbackCauseAndMoodCategoriesList,
  GetFeedbackLogs,
  selectCauseCategories,
  selectFeedbackDetails,
  UpdateFeedbackManager,
} from "store/slicers/feedback";
import FeedbackStatusDrawer from "../../FeedbackStatusDrawer";

interface IFormData {
  feedbackStatus: number;
  manager: number | string;
}

const FeedbackDetailsTop = () => {
  const [activeRow, setActiveRow] = useState<IActiveRow>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const methods = useForm<IFormData>();
  const feedbackItemDetails = useSelector(selectFeedbackDetails);
  const causeCategoriesList = useSelector(selectCauseCategories);

  const managersList = useSelector(selectManagers);
  const dispatch = useAsyncDispatch();
  const { id } = useParams();

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const handleChangeManager = async (value: number) => {
    const { meta } = await dispatch(
      UpdateFeedbackManager({ assignUserID: value, feedbackIDs: [id] })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await dispatch(GetFeedbackLogs(id));
  };

  useEffect(() => {
    methods.reset({
      feedbackStatus: feedbackItemDetails?.status,
      manager: feedbackItemDetails?.assignID ?? "",
    });
  }, [feedbackItemDetails?.status, methods, feedbackItemDetails?.assignID]);

  useEffect(() => {
    if (!causeCategoriesList?.length) {
      dispatch(GetFeedbackCauseAndMoodCategoriesList());
    }
  }, [causeCategoriesList, dispatch]);

  return (
    <FormProvider {...methods}>
      <Paper elevation={3}>
        <Box p={2} sx={{ minHeight: 330 }}>
          <Box display="flex">
            <Box width="30%" mr={5}>
              <BasicSelect<IFeedbackStatusList>
                name="feedbackStatus"
                defaultValue={""}
                label="Feedback status"
                valueProp="value"
                labelProp="name"
                options={feedbackStatusList}
                onChangeCB={(value: number) =>
                  changeFeedbackStatus({
                    value,
                    rowId: id,
                    dispatch,
                    setDrawerOpen,
                    setActiveRow,
                    refetchFeedbacks: undefined,
                  })
                }
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
                onChangeCB={(value: number) => handleChangeManager(value)}
              />
            </Box>
          </Box>
          <Box
            display="grid"
            sx={{
              gridTemplateRows: "auto 1fr auto",
              gridTemplateColumns: "1fr 2fr",
            }}
            mt={4}
          >
            {feedbackItemDetails?.customerName ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Customer
                </Typography>
                <Typography mb={2}>
                  {feedbackItemDetails.customerName}
                </Typography>
              </Box>
            ) : null}
            {feedbackItemDetails?.customerPhone ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Phone number
                </Typography>
                <Typography mb={2}>
                  {feedbackItemDetails.customerPhone}
                </Typography>
              </Box>
            ) : null}
            {feedbackItemDetails?.customerEmail ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Email Address
                </Typography>
                <Typography mb={2}>
                  {feedbackItemDetails.customerEmail}
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box>
            {feedbackItemDetails?.id ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Feedback ID
                </Typography>
                <Typography mb={2}>{feedbackItemDetails.id}</Typography>
              </Box>
            ) : null}
            {feedbackItemDetails?.customerEmail ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Campaign
                </Typography>
                <Typography mb={2}>
                  {feedbackItemDetails.campaignName}
                </Typography>
              </Box>
            ) : null}
            {feedbackItemDetails?.customerEmail ? (
              <Box>
                <Typography fontSize={14} fontWeight="bold" mb={1}>
                  Submitted
                </Typography>
                <Typography mb={2}>
                  {feedbackItemDetails.submittedDate}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Paper>

      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title="Edit Feedback Status"
      >
        {activeRow?.type ? (
          <FeedbackStatusDrawer
            editData={activeRow}
            onSuccess={onFormSuccess}
          />
        ) : null}
      </RightDrawer>
    </FormProvider>
  );
};

export default FeedbackDetailsTop;
