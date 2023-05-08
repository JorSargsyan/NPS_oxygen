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
  DeleteCampaignTemplate,
  DeleteSurveyTemplate,
  GetCampaignSurveyTemplateById,
  GetSurveys,
  selectCampaignInfo,
  selectSurveyInfo,
} from "store/slicers/campaignDetail";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import { ITemplate } from "store/interfaces/campaignDetails";
import Templates from "./components/Templates";

const DesignTab = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const dispatch = useAsyncDispatch();
  const campaignInfo = useSelector(selectCampaignInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);

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

    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

    toast.success("Template applied successfully");
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
    await dispatch(GetCampaignSurveyTemplateById(surveyInfo.details.id));

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
