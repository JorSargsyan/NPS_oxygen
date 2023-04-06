import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import BasicTabs from "shared/ui/Tabs";
import { campaignDetailsTabList } from "./constants";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  GetCampaignById,
  GetCampaignTriggers,
  GetSurveys,
  GetTemplates,
  UpdateSurvey,
  resetCampaignDetails,
  selectCampaignInfo,
  selectCampaignSurveys,
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
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { ECampaignSurveyType } from "./questions/LeftSidebar/constants";
import { setSidebarVisible } from "store/slicers/common";
import { IUpdateSurveyRequest } from "store/interfaces/campaignDetails";

const defaultAnswer = {
  value: "",
  position: 0,
};

let metricConfigable = [
  Number(ECampaignSurveyType.Nps),
  Number(ECampaignSurveyType.Rating),
  Number(ECampaignSurveyType.ServiceQualityScore),
];

let answerResettable = [
  Number(ECampaignSurveyType.MultipleChoice),
  Number(ECampaignSurveyType.SingleChoice),
];

interface IFormData {
  title: string;
  answers: any[];
  isRequired: boolean;
  buttonText: string;
  multipleConfig?: {
    multipleType: number;
    multipleMin: string;
    multipleMax: string;
    multipleExact: string;
  };
  commentConfig?: {
    commentType: number;
    commentMin: string;
    commentMax: string;
  };
  metricConfig?: {
    metricRightText: string;
    metricLeftText: string;
    customStartLength: string;
    customEndLength: string;
  };
}

const CampaignDetail = () => {
  const [tabValue, setTabValue] = useState(0);
  const surveyList = useSelector(selectCampaignSurveys);
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const campaignInfo = useSelector(selectCampaignInfo);
  const { id } = useParams();
  const dispatch = useAsyncDispatch();
  const surveyDetails = useSelector(selectSurveyInfo);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const {
    contextInitialState: { campaignDetails },
    dispatchContext,
  } = useContext(GlobalContext);

  const methods = useForm<IFormData>({
    defaultValues: {
      answers: [defaultAnswer],
      title: "",
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

  const onSubmit = async (formData: IFormData) => {
    const position = surveyList.find((i) => i.id === selectedSurvey).position;
    let answers = [];

    if (formData.answers?.length) {
      answers = formData?.answers?.map((answer) => {
        return {
          ...answer,
          newAnswer: !answer.id || false,
        };
      });
    }

    const config = {
      ...(surveyDetails.details.type ===
        Number(ECampaignSurveyType.Comment) && {
        commentConfig: formData?.commentConfig,
      }),
      ...(surveyDetails.details.type ===
        Number(ECampaignSurveyType.MultipleChoice) && {
        multipleConfig: formData?.multipleConfig,
      }),
      ...(metricConfigable.includes(surveyDetails.details.type) && {
        metricConfig: formData?.metricConfig,
      }),
    };

    const data: IUpdateSurveyRequest = {
      campaignID: campaignInfo.id,
      title: formData.title,
      position,
      isRequired: formData.isRequired,
      buttonText: formData.buttonText,
      type: surveyDetails.details.type,
      answers,
      ...config,
    };

    const { meta } = await dispatch(
      UpdateSurvey({
        data: data,
        id: surveyDetails.details.id,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    dispatch(GetSurveys(campaignInfo.id));

    toast.success("Campaign Saved successfully");
  };

  const init = useCallback(() => {
    Promise.all([
      dispatch(GetCampaignById(Number(id))),
      dispatch(GetTemplates(Number(id))),
      dispatch(GetSurveys(Number(id))),
      dispatch(GetCampaignTriggers()),
    ]);
  }, [dispatch, id]);

  const handleResetForm = useCallback(() => {
    methods.reset({
      title: surveyDetails.details?.title || "",
      answers:
        surveyDetails.details.answers?.length &&
        answerResettable.includes(surveyDetails.details.type)
          ? surveyDetails.details.answers
          : [defaultAnswer],
      metricConfig: {
        metricLeftText:
          surveyDetails.details?.metricConfig?.metricLeftText || "",
        metricRightText:
          surveyDetails.details?.metricConfig?.metricRightText || "",
        customStartLength:
          surveyDetails.details?.metricConfig?.customStartLength.toString() ||
          "",
        customEndLength:
          surveyDetails.details?.metricConfig?.customEndLength.toString() || "",
      },
      buttonText: surveyDetails.details.buttonText,
      isRequired: surveyDetails.details?.isRequired,
      multipleConfig: {
        multipleType: surveyDetails.details?.multipleConfig?.multipleType,
        multipleExact:
          surveyDetails.details?.multipleConfig?.multipleExact?.toString() ||
          "",
        multipleMin:
          surveyDetails.details?.multipleConfig?.multipleMin?.toString() || "",
        multipleMax:
          surveyDetails.details?.multipleConfig?.multipleMax?.toString() || "",
      },
      commentConfig: {
        commentType: surveyDetails.details?.commentConfig?.commentType,
        commentMin:
          surveyDetails.details?.commentConfig?.commentMin?.toString() || "",
        commentMax:
          surveyDetails.details?.commentConfig?.commentMax?.toString() || "",
      },
    });
  }, [
    methods,
    surveyDetails.details?.answers,
    surveyDetails.details?.buttonText,
    surveyDetails.details?.commentConfig?.commentMax,
    surveyDetails.details?.commentConfig?.commentMin,
    surveyDetails.details?.commentConfig?.commentType,
    surveyDetails.details?.isRequired,
    surveyDetails.details?.metricConfig?.customEndLength,
    surveyDetails.details?.metricConfig?.customStartLength,
    surveyDetails.details?.metricConfig?.metricLeftText,
    surveyDetails.details?.metricConfig?.metricRightText,
    surveyDetails.details?.multipleConfig?.multipleExact,
    surveyDetails.details?.multipleConfig?.multipleMax,
    surveyDetails.details?.multipleConfig?.multipleMin,
    surveyDetails.details?.multipleConfig?.multipleType,
    surveyDetails.details?.title,
    surveyDetails.details?.type,
  ]);

  const onChange = (val) => {
    console.log(val);
    setTabValue(val);
  };

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

    handleResetForm();
  }, [handleResetForm, methods, surveyDetails?.details]);

  useLayoutEffect(() => {
    dispatch(setSidebarVisible(false));
    return () => {
      dispatch(resetCampaignDetails());
    };
  }, [dispatch]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box display="flex">
          <BasicTabs
            onChange={onChange}
            tabsData={campaignDetailsTabList}
            Content={() => {
              if (tabValue === 0) {
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
              }
              return null;
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
