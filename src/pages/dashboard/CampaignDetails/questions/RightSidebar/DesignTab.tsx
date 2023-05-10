import {
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
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

import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import BasicSelect from "shared/ui/Select";
import UploadImage from "./components/UploadImage";
import { FormProvider, useForm } from "react-hook-form";

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
        },
        id: surveyTemplateID,
      })
    );
  };

  const handleApply = async () => {
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

    dispatch(setSelectedTemplateID(null));
    toast.success("Template applied successfully");
  };

  const handleApplyAll = async () => {
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

    dispatch(setSelectedTemplateID(null));
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

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};

export default DesignTab;
