import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import BasicTabs from "shared/ui/Tabs";
import { campaignDetailsTabList } from "./constants";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  GetCampaignById,
  GetCampaignTriggers,
  GetSurveys,
  GetTemplates,
  selectSelectedSurvey,
  selectSurveyInfo,
} from "store/slicers/campaignDetail";
import { Button, Typography } from "@mui/material";
import SharedDialog from "shared/ui/Dialog";
import { deleteNoteDialogOptions } from "../FeedBacks/components/FeedbackDetails/FeedbackDetailsBottomRight/constants";
import { GlobalContext } from "App";
import { EAppReducerTypes } from "shared/helpers/AppContext";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const defaultAnswer = {
  value: "",
  position: 0,
};

const CampaignDetail = () => {
  const { id } = useParams();
  const dispatch = useAsyncDispatch();
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const surveyDetails = useSelector(selectSurveyInfo);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const {
    contextInitialState: { campaignDetails },
    dispatchContext,
  } = useContext(GlobalContext);

  const methods = useForm({
    defaultValues: {
      answers: [defaultAnswer],
      title: "",
      metricConfig: {
        metricLeftText: "",
        metricRightText: "",
      },
    },
  });

  const handleDelete = () => {};

  const handleSetOpen = (val) => {
    setUnsavedModalOpen(val);
    dispatchContext({
      type: EAppReducerTypes.Set_unsaved_modal_open,
      payload: val,
    });
  };

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const init = useCallback(() => {
    Promise.all([
      dispatch(GetCampaignById(Number(id))),
      dispatch(GetTemplates(Number(id))),
      dispatch(GetSurveys(Number(id))),
      dispatch(GetCampaignTriggers()),
    ]);
  }, [dispatch, id]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    setUnsavedModalOpen(campaignDetails.isOpen);
  }, [campaignDetails?.isOpen]);

  useEffect(() => {
    if (!surveyDetails?.details) {
      return;
    }

    methods.reset({
      title: surveyDetails.details?.title || "",
      answers: surveyDetails.details.answers?.length
        ? surveyDetails.details.answers
        : [defaultAnswer],
      metricConfig: {
        metricLeftText:
          surveyDetails.details?.metricConfig?.metricLeftText || "",
        metricRightText:
          surveyDetails.details?.metricConfig?.metricRightText || "",
      },
    });
  }, [methods, surveyDetails?.details]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box display="flex">
          <BasicTabs
            tabsData={campaignDetailsTabList}
            Content={() => {
              return (
                <Box
                  sx={{
                    position: "absolute",
                    right: 10,
                  }}
                  onClick={methods.handleSubmit(onSubmit)}
                >
                  <Button variant="contained">
                    <Typography>Save changes</Typography>
                  </Button>
                </Box>
              );
            }}
          />
        </Box>
      </FormProvider>
      <SharedDialog
        open={unsavedModalOpen}
        setOpen={handleSetOpen}
        onSuccess={handleDelete}
        textConfig={deleteNoteDialogOptions}
      />
    </Box>
  );
};

export default CampaignDetail;
