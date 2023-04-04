import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { useSelector } from "react-redux";
import {
  CreateSurveyLogic,
  selectCampaignSurveys,
  selectSelectedSurvey,
  selectSurveyInfo,
  selectSurveyLogic,
} from "store/slicers/campaignDetail";
import { useEffect, useMemo } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { requiredRules } from "shared/helpers/validators";
import { ISurveyLogic } from "store/interfaces/campaignDetails";
import { CampaignSurveyTypeList } from "../../LeftSidebar/constants";

const AddLogic = ({
  onSuccess,
  editData,
}: {
  onSuccess: () => void;
  editData: ISurveyLogic;
}) => {
  const methods = useForm();
  const dispatch = useAsyncDispatch();
  const surveyInfo = useSelector(selectSurveyInfo);
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const surveyList = useSelector(selectCampaignSurveys);
  const surveyLogicData = useSelector(selectSurveyLogic);

  const possibleNextQuestions = useMemo(() => {
    const indexOfActual = surveyList.findIndex((i) => i.id === selectedSurvey);
    return surveyList.slice(indexOfActual + 1, surveyList.length).map((i) => {
      return {
        ...i,
        title: i.title || CampaignSurveyTypeList[i.type],
      };
    });
  }, [selectedSurvey, surveyList]);

  const filteredAnswers = useMemo(() => {
    let notAvailableSurveyIds = [];
    surveyLogicData?.surveyLogic?.forEach(
      (logic) =>
        (notAvailableSurveyIds = notAvailableSurveyIds.concat(
          logic.surveyAnswers.map((i) => i.surveyAnswerID)
        ))
    );
    return editData
      ? surveyInfo?.details?.answers
      : surveyInfo?.details?.answers.filter(
          (i) => !notAvailableSurveyIds.includes(Number(i.id))
        );
  }, [editData, surveyInfo?.details?.answers, surveyLogicData?.surveyLogic]);

  const onSubmit = async (formData) => {
    const data = {
      answerIDs: formData.options.map((i) => i.id),
      nextID: formData.nextID.id,
      oldAnswerIDs: editData?.surveyAnswers.map((i) => i.surveyAnswerID) || [],
    };
    const { meta } = await dispatch(
      CreateSurveyLogic({
        formData: data,
        id: surveyInfo.details.id,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    toast.success("Logic added successfully");
    onSuccess?.();
  };

  useEffect(() => {
    if (!editData) {
      return;
    }

    const nextID = surveyList.find(
      (i) => String(i.id) === String(editData.linkedSurvey.surveyID)
    );

    const optionIds = editData.surveyAnswers.map((i) => i.surveyAnswerID);

    const options = surveyInfo.details.answers.filter((i) =>
      optionIds.includes(Number(i.id))
    );

    methods.reset({
      options: options,
      nextID,
    });
  }, [editData, methods, surveyInfo?.details?.answers, surveyList]);

  return (
    <Box p={2}>
      <FormProvider {...methods}>
        <Box my={2}>
          <Typography fontWeight={"600"}>
            If any of the following answers is selected
          </Typography>
        </Box>
        <BasicAutocomplete
          inputLabel={"Options"}
          multiple
          hasSelectAllOption
          optionLabel="value"
          options={filteredAnswers}
          name={"options"}
          rules={requiredRules}
          defaultValue={[]}
        />
        <Box my={2}>
          <Typography fontWeight={"600"}>Then go to</Typography>
        </Box>
        <BasicAutocomplete
          inputLabel={"Next Question"}
          options={possibleNextQuestions}
          name={"nextID"}
          optionLabel="title"
          rules={requiredRules}
          defaultValue={""}
        />
        <Box mt={4} display="flex" justifyContent={"flex-end"}>
          <Button variant="outlined" onClick={methods.handleSubmit(onSubmit)}>
            <Typography>Save</Typography>
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default AddLogic;
