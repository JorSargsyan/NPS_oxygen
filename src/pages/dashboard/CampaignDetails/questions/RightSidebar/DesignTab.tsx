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
  selectSurveyInfo,
} from "store/slicers/campaignDetail";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import Templates from "./components/Templates";

const DesignTab = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const [selectedTemplateID, setSelectedTemplateID] = useState<number | null>(
    null
  );
  const dispatch = useAsyncDispatch();
  const campaignInfo = useSelector(selectCampaignInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);

  const handleApply = async () => {
    await dispatch(
      UpdateSurveyTemplateDefault({
        data: {
          logoImage: {
            base64Image: surveyInfo.template.logoImageBase64,
            extension: "",
            removeImage: false,
          },
          image: {
            base64Image: surveyInfo.template.imageBase64,
            removeImage: false,
            extension: "",
          },
          name: surveyInfo.template.name,
          questionColor: surveyInfo.template.questionColor,
          answerColor: surveyInfo.template.answerColor,
          buttonColor: surveyInfo.template.buttonColor,
          buttonTextColor: surveyInfo.template.buttonTextColor,
        },
        id: surveyInfo.template.id,
      })
    );

    onMenuOpen(false);
    const { meta } = await dispatch(
      ApplySurvey({
        surveyID: String(surveyInfo.details.id),
        templateID: surveyInfo.template.id,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

    setSelectedTemplateID(null);
    toast.success("Template applied successfully");
  };

  const handleApplyAll = async () => {
    await dispatch(
      UpdateSurveyTemplateDefault({
        data: {
          logoImage: {
            base64Image: surveyInfo.template.logoImageBase64,
            extension: "",
            removeImage: false,
          },
          image: {
            base64Image: surveyInfo.template.imageBase64,
            removeImage: false,
            extension: "",
          },
          name: surveyInfo.template.name,
          questionColor: surveyInfo.template.questionColor,
          answerColor: surveyInfo.template.answerColor,
          buttonColor: surveyInfo.template.buttonColor,
          buttonTextColor: surveyInfo.template.buttonTextColor,
        },
        id: surveyInfo.template.id,
      })
    );

    onMenuOpen(false);
    const { meta } = await dispatch(
      ApplyForAllSurveys({
        campaignID: String(campaignInfo.id),
        templateID: surveyInfo.template.id,
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

    setSelectedTemplateID(null);
    toast.success("Template applied successfully");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    onMenuOpen(true);
  };

  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Templates
            selectedTemplateID={selectedTemplateID}
            setSelectedTemplateID={setSelectedTemplateID}
          />
          {selectedTemplateID && (
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
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DesignTab;
