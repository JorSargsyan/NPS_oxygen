import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { campaignDetailsTabList, unsavedDialogWarning } from "./constants";
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
  GetCampaignSurveyById,
  GetSurveys,
  GetSurveysInitial,
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
import { GlobalContext } from "App";
import { EAppReducerTypes } from "shared/helpers/AppContext";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { ECampaignSurveyType } from "./questions/LeftSidebar/constants";
import { setSidebarVisible } from "store/slicers/common";
import { IUpdateSurveyRequest } from "store/interfaces/campaignDetails";
import CampaignTabs from "components/campaigns/CampaignTabs";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import QuestionPreview from "./components/QuestionPreview";

const defaultAnswer = {
  value: "",
  position: 0,
};

export const metricConfigable = [
  Number(ECampaignSurveyType.Nps),
  Number(ECampaignSurveyType.Rating),
  Number(ECampaignSurveyType.ServiceQualityScore),
  Number(ECampaignSurveyType.CustomerEffortScore),
  Number(ECampaignSurveyType.CustomStar),
  Number(ECampaignSurveyType.CustomerSatisfactionScore),
];

const answerResettable = [
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
  contactConfig?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}

const CampaignDetail = () => {
  const [isAlreadySubmited, setAlreadySubmited] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const surveyList = useSelector(selectCampaignSurveys);
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const campaignInfo = useSelector(selectCampaignInfo);
  const { id } = useParams();
  const dispatch = useAsyncDispatch();
  const surveyDetails = useSelector(selectSurveyInfo);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewModalData, setPreviewModalData] = useState(null);
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

  const methodValues = methods.watch();

  const handleSuccess = () => {
    dispatchContext({
      type: EAppReducerTypes.SET_UNSAVED_MODAL_DATA,
      payload: {
        isSuccess: true,
      },
    });
  };

  const handleSetOpen = (val) => {
    setUnsavedModalOpen(val);
    dispatchContext({
      type: EAppReducerTypes.SET_UNSAVED_MODAL_DATA,
      payload: {
        isOpen: true,
      },
    });
  };

  const handleSetClose = () => {
    dispatchContext({
      type: EAppReducerTypes.SET_UNSAVED_MODAL_DATA,
      payload: {
        isOpen: false,
      },
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

    await Promise.all([
      dispatch(GetSurveys(campaignInfo.id)),
      dispatch(GetCampaignSurveyById(selectedSurvey)),
    ]);

    setAlreadySubmited(true);

    toast.success("Campaign Saved successfully");
  };

  const init = useCallback(() => {
    Promise.all([
      dispatch(GetCampaignById(Number(id))),
      dispatch(GetTemplates(Number(id))),
      dispatch(GetSurveysInitial(Number(id))),
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
    setTabValue(val);
  };

  const openPreviewModal = () => {
    const watchValues = { ...methods.watch() };
    let data = {
      details: {
        ...surveyDetails?.details,
        title: watchValues.title,
        button: watchValues.buttonText,
      },
      template: { ...surveyDetails?.template },
    };
    if (
      surveyDetails?.details?.type === Number(ECampaignSurveyType.Rating) ||
      surveyDetails?.details?.type === Number(ECampaignSurveyType.Nps) ||
      surveyDetails?.details?.type ===
        Number(ECampaignSurveyType.ServiceQualityScore)
    ) {
      const {
        metricConfig: { customEndLength, customStartLength },
      } = watchValues;
      let answersArr = [];
      for (
        let i = Number(customStartLength);
        i <= Number(customEndLength);
        i++
      ) {
        answersArr.push({
          id: i,
          value: i,
        });
      }
      data = {
        details: {
          ...data?.details,
          metricConfig: watchValues?.metricConfig,
          answers: answersArr,
        },
        template: { ...data?.template },
      };
    }
    if (
      surveyDetails?.details?.type ===
        Number(ECampaignSurveyType.SingleChoice) ||
      surveyDetails?.details?.type ===
        Number(ECampaignSurveyType.MultipleChoice)
    ) {
      data = {
        details: {
          ...data?.details,
          answers: watchValues?.answers,
        },
        template: { ...data?.template },
      };
    }

    setPreviewModalData(data);
    setPreviewModalOpen(true);
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

  useEffect(() => {
    setAlreadySubmited(false);
  }, [methodValues]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box display="flex">
          <CampaignTabs
            onChange={onChange}
            tabsData={campaignDetailsTabList}
            Content={() => {
              if (tabValue === 0) {
                return (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 10,
                      display: "flex",
                      gap: 1,
                      pt: "10px",
                    }}
                  >
                    <Button
                      onClick={openPreviewModal}
                      variant="outlined"
                      startIcon={<EyeIcon height={20} />}
                    >
                      <Typography>Preview</Typography>
                    </Button>
                    <Button
                      disabled={!methods.formState.isDirty || isAlreadySubmited}
                      onClick={methods.handleSubmit(onSubmit)}
                      variant="contained"
                    >
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
        onSuccess={handleSuccess}
        handleCloseCb={handleSetClose}
        textConfig={unsavedDialogWarning}
      />
      <SharedDialog
        hasActions={false}
        open={isPreviewModalOpen}
        setOpen={setPreviewModalOpen}
        fullScreen
        textConfig={{ title: "Preview" }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiDialogContent-root": {
              padding: 0,
            },
          },
        }}
      >
        <QuestionPreview
          methods={methods}
          previewModalData={previewModalData}
        />
      </SharedDialog>
    </Box>
  );
};

export default CampaignDetail;
