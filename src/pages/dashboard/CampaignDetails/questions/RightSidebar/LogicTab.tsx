import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import RightDrawer from "shared/ui/Drawer";
import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import MoreIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import {
  DeleteSurveyLogic,
  GetSurveyLogic,
  selectCampaignSurveys,
  selectSurveyInfo,
  selectSurveyLogic,
} from "store/slicers/campaignDetail";
import AddLogic from "./components/AddLogic";
import {
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ISurveyLogic } from "store/interfaces/campaignDetails";
import toast from "react-hot-toast";
import { ERequestStatus } from "store/enums/index.enum";
import { NO_LOGIC_TYPES } from "./constants";

const LogicTab = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const [actualLogic, setActualLogic] = useState<ISurveyLogic | null>(null);
  const [menuOpen, onMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const surveyInfo = useSelector(selectSurveyInfo);
  const surveyList = useSelector(selectCampaignSurveys);
  const surveyLogic = useSelector(selectSurveyLogic);

  const fetchLogic = useCallback(() => {
    dispatch(GetSurveyLogic(surveyInfo.details.id));
  }, [dispatch, surveyInfo?.details?.id]);

  const handleSuccess = () => {
    setDrawerOpen(false);
    fetchLogic();
  };

  const handleAddLogic = () => {
    setActualLogic(null);
    setDrawerOpen(true);
  };

  const handleEdit = () => {
    onMenuOpen(false);
    setDrawerOpen(true);
  };

  const handleRemove = async () => {
    onMenuOpen(false);
    const { meta } = await dispatch(
      DeleteSurveyLogic(actualLogic.surveyAnswers.map((i) => i.surveyAnswerID))
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    fetchLogic();
    toast.success("Logic deleted successfully");
  };

  const handleOpenMenu = (e, logic) => {
    setActualLogic(logic);
    setAnchorEl(e.currentTarget);
    onMenuOpen(true);
  };

  useEffect(() => {
    if (surveyInfo?.details?.id) {
      fetchLogic();
    }
  }, [dispatch, fetchLogic, surveyInfo?.details?.id]);

  return (
    <Box p={2}>
      <Box>
        {surveyLogic?.surveyLogic?.map((logic, index) => {
          const actualQuestionIndex =
            surveyList.findIndex(
              (i) => String(i.id) === String(logic.linkedSurvey.surveyID)
            ) + 1;
          return (
            <Box key={index}>
              <Box>
                <Box
                  p={1}
                  display="flex"
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  <Box flex={2}>
                    {logic.surveyAnswers.map((answer) => (
                      <Box m="4px" key={answer.surveyAnswerID}>
                        <Chip
                          color="primary"
                          label={answer.surveyAnswerValue}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box flex={2} display="flex" justifyContent={"center"}>
                    <ArrowLongRightIcon height={30} />
                  </Box>
                  <Box flex={2}>
                    <Chip
                      color="primary"
                      label={`Question ${actualQuestionIndex}`}
                    />
                  </Box>
                  <Box flex={1} display="flex" justifyContent={"center"}>
                    <IconButton onClick={(e) => handleOpenMenu(e, logic)}>
                      <MoreIcon height={20} />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
              </Box>
            </Box>
          );
        })}
      </Box>
      {!surveyLogic?.surveyLogic?.length && (
        <Typography textAlign={"center"} fontWeight="600">
          Please add logic paths
        </Typography>
      )}
      {!NO_LOGIC_TYPES.includes(String(surveyInfo.details.type)) ? (
        <Box display="flex" mt={2} justifyContent={"flex-end"}>
          <Button
            variant="outlined"
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            onClick={handleAddLogic}
          >
            <Typography>Add Logic</Typography>
          </Button>
        </Box>
      ) : (
        <Box textAlign={"center"}>
          <Typography fontWeight={"600"}>
            This question type cannot have a logical path
          </Typography>
          <Typography>
            Please try to build logical paths for other question types
          </Typography>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => onMenuOpen(false)}
      >
        <MenuItem onClick={handleEdit}>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <Typography>Remove</Typography>
        </MenuItem>
      </Menu>
      <RightDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={"Add logic"}
      >
        <AddLogic editData={actualLogic} onSuccess={handleSuccess} />
      </RightDrawer>
    </Box>
  );
};

export default LogicTab;
