import {
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import {
  ApplyForAllSurveys,
  ApplySurvey,
  GetCampaignSurveyTemplateById,
  UpdateSurveyTemplateDefault,
  selectCampaignInfo,
  selectSelectedTemplateID,
  selectSurveyInfo,
  selectSurveyTemplateID,
  selectTemplates,
  setSelectedTemplateID,
} from "store/slicers/campaignDetail";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import BasicSelect from "shared/ui/Select";
import UploadImage from "./components/UploadImage";
import { FormProvider, useForm } from "react-hook-form";
import { selectCampaignLoading, setLoading } from "store/slicers/common";

const DesignTab = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const templateList = useSelector(selectTemplates);
  const dispatch = useAsyncDispatch();
  const methods = useForm({
    defaultValues: {
      template: "",
      image: "",
    },
  });
  const surveyTemplateID = useSelector(selectSurveyTemplateID);
  const selectedTemplateID = useSelector(selectSelectedTemplateID);
  const campaignInfo = useSelector(selectCampaignInfo);
  const campaignLoadingState = useSelector(selectCampaignLoading);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);

  const handleUpdateSurveyDefault = async () => {
    await dispatch(
      UpdateSurveyTemplateDefault({
        data: {
          logoImage: {
            base64Image: surveyInfo.template.logoImageBase64,
            extension: "",
            removeImage: false,
          },
          image: {
            base64Image: methods.watch("image"),
            removeImage: false,
            extension: "",
          },
          name: surveyInfo.template.name,
          questionColor: surveyInfo.template.questionColor,
          answerColor: surveyInfo.template.answerColor,
          buttonColor: surveyInfo.template.buttonColor,
          buttonTextColor: surveyInfo.template.buttonTextColor,
          publicTemplateID: Number(methods.watch("template")),
        },
        id: surveyTemplateID,
      })
    );
  };

  const handleApply = async () => {
    await dispatch(setLoading(true));
    await handleUpdateSurveyDefault();
    onMenuOpen(false);
    const { meta } = await dispatch(
      ApplySurvey({
        surveyID: String(surveyInfo.details.id),
        templateID: surveyTemplateID,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

    await dispatch(setSelectedTemplateID(null));
    await dispatch(setLoading(false));
    toast.success("Template applied successfully");
  };

  const handleApplyAll = async () => {
    await dispatch(setLoading(true));
    await handleUpdateSurveyDefault();

    onMenuOpen(false);
    const { meta } = await dispatch(
      ApplyForAllSurveys({
        campaignID: String(campaignInfo.id),
        templateID: surveyTemplateID,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

    await dispatch(setSelectedTemplateID(null));
    await dispatch(setLoading(false));
    toast.success("Template applied successfully");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    onMenuOpen(true);
  };

  const handleSelectTemplate = (id: number) => {
    dispatch(setSelectedTemplateID(id));
    methods.setValue(
      "image",
      templateList.find((i) => i.id === id).imageBase64
    );
  };

  const handleChangeImage = (val, name) => {
    methods.setValue(name, val);
  };

  const init = useCallback(() => {
    if (selectedTemplateID) {
      methods.setValue("template", String(selectedTemplateID));
      methods.setValue(
        "image",
        templateList.find((i) => i.id === selectedTemplateID).imageBase64
      );
    }
  }, [methods, selectedTemplateID, templateList]);

  const resetImage = useCallback(() => {
    methods.reset({
      image: "",
      template: "",
    });
    if (!selectedTemplateID) {
      methods.reset({
        image:
          templateList.find(
            (i) => i.id === surveyInfo?.template?.publicTemplateID
          )?.imageBase64 ?? "",
        template: surveyInfo?.template?.publicTemplateID
          ? String(surveyInfo?.template?.publicTemplateID)
          : "",
      });
    } else {
      methods.reset({
        image:
          templateList.find((i) => i.id === selectedTemplateID)?.imageBase64 ??
          "",
        template: selectedTemplateID ? String(selectedTemplateID) : "",
      });
    }
  }, [
    methods,
    surveyInfo?.template?.publicTemplateID,
    templateList,
    selectedTemplateID,
  ]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    resetImage();
  }, [resetImage]);

  return (
    <FormProvider {...methods}>
      {campaignLoadingState ? (
        <Box p={2}>
          <Box mb={2}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={"100%"}
              height="59px"
            />
          </Box>
          <Card>
            <CardContent>
              <Skeleton
                variant="rounded"
                animation="wave"
                width={"100%"}
                height="145px"
              />
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Box p={2}>
          <Box mb={2}>
            <BasicSelect
              options={(templateList || [])?.filter((i) => i.id)}
              label={"Template"}
              name={"template"}
              labelProp="name"
              valueProp="id"
              onChangeCB={handleSelectTemplate}
            />
          </Box>

          <Card>
            <CardContent>
              <UploadImage
                name="image"
                title="Image"
                val={methods.watch("image")}
                onChange={handleChangeImage}
              />
              {methods.watch("image") ? (
                <Box mt={2} display="flex" justifyContent={"flex-end"}>
                  <Button onClick={handleOpenMenu} variant="outlined">
                    <Typography>Apply</Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={() => onMenuOpen(false)}
                  >
                    <MenuItem onClick={() => handleApply()}>
                      <Typography>For this page</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleApplyAll()}>
                      <Typography>For all pages</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Box>
      )}
    </FormProvider>
  );
};

export default DesignTab;
