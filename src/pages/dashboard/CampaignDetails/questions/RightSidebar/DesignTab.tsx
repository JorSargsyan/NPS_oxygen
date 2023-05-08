import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import {
  ApplyForAllSurveys,
  ApplySurvey,
  DeleteSurveyTemplate,
  GetSurveys,
  DeleteCampaignTemplate,
  UpdateSurveyTemplate,
  selectCampaignInfo,
  selectSurveyInfo,
  GetCampaignSurveyTemplateById,
} from "store/slicers/campaignDetail";
import defaultImg from "assets/images/survey_bg.png";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { ITemplate } from "store/interfaces/campaignDetails";
import Templates from "./components/Templates";

const DesignTab = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const dispatch = useAsyncDispatch();
  const campaignInfo = useSelector(selectCampaignInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);

  const removeSurveyTemplate = async () => {
    const { meta } = await dispatch(
      DeleteSurveyTemplate(surveyInfo.template.id)
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    dispatch(GetSurveys(campaignInfo.id));
    toast.success("Survey Template removed succesfully");
  };

  const removeCampaignTemplate = async () => {
    const { meta } = await dispatch(DeleteCampaignTemplate(campaignInfo.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    dispatch(GetSurveys(campaignInfo.id));
    toast.success("Campaign Template removed succesfully");
  };

  const handleApply = async () => {
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

    const { payload } = await dispatch(
      GetCampaignSurveyTemplateById(surveyInfo.details.id)
    );

    const payloadTyped = payload as ITemplate;
    toast.success("Template applied succesfully");
  };

  const handleApplyAll = async () => {
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
    const { payload } = await dispatch(
      GetCampaignSurveyTemplateById(surveyInfo.details.id)
    );

    const payloadTyped = payload as ITemplate;
    toast.success("Template applied succesfully");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    onMenuOpen(true);
  };

  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Templates />

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
        </CardContent>
      </Card>
    </Box>
  );
};

export default DesignTab;
