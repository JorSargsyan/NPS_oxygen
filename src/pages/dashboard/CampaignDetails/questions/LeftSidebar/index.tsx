import {
  Button,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {
  ChangeCampaignSurveyPositions,
  CreateSurvey,
  GetCampaignSurveyById,
  GetCampaignSurveyTemplateById,
  GetSurveyLogic,
  GetSurveys,
  RemoveCampaignSurvey,
  selectCampaignInfo,
  selectCampaignSurveys,
  selectSelectedSurvey,
  setSelectedSurvey,
} from "store/slicers/campaignDetail";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { useCallback, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import reorderDragDrop from "shared/helpers/reorderDragDrop";
import { ICampaignSurvey } from "store/interfaces/campaignDetails";
import { ERequestStatus } from "store/enums/index.enum";
import SharedDialog from "shared/ui/Dialog";
import {
  CampaignSurveyIcons,
  CampaignSurveyTypeList,
  ECampaignSurveyType,
  SurveyTypeConfig,
  deleteCampaignSurveyWarningConfig,
} from "./constants";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CircleIcon from "@heroicons/react/24/outline/StopCircleIcon";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ChatIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import ChartIcon from "@heroicons/react/24/outline/ChartBarIcon";
import SmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import StarIcon from "@heroicons/react/24/outline/StarIcon";
import HandIcon from "@heroicons/react/24/outline/HandRaisedIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import RatingIcon from "@heroicons/react/24/outline/PresentationChartLineIcon";
import PieChartIcon from "@heroicons/react/24/outline/ChartPieIcon";
import SatisfactionIcon from "@heroicons/react/24/outline/ChartBarIcon";
import { setCampaignLoading } from "store/slicers/common";
import { useFormContext } from "react-hook-form";
import { GlobalContext } from "App";
import { EAppReducerTypes } from "shared/helpers/AppContext";

const LeftSidebar = () => {
  const { formState } = useFormContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const addContentMenuOpen = Boolean(anchorEl);
  const {
    contextInitialState: { campaignDetails },
    dispatchContext,
  } = useContext(GlobalContext);
  const dispatch = useAsyncDispatch();
  const [warningOpen, setWarningOpen] = useState(false);
  const campaignSurveys = useSelector(selectCampaignSurveys);
  const [surveyList, setSurveyList] = useState<ICampaignSurvey[]>([]);
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const campaignInfo = useSelector(selectCampaignInfo);

  const alreadyHasType = useCallback(
    (type: ECampaignSurveyType) => {
      return surveyList.find((i) => i.type === Number(type));
    },
    [surveyList]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickContentAdd = async (e) => {
    e.stopPropagation();
    const type = e.currentTarget.id;

    handleClose();

    const formData = {
      ...(SurveyTypeConfig[type] || {}),
      title: "",
      campaignID: String(campaignInfo.id),
      buttonText: "Next",
      type,
      selected: false,
      position:
        type === ECampaignSurveyType.Welcome
          ? 0
          : (surveyList[surveyList.length - 2]?.position || 1) + 1,
      isRequired: true,
    };

    const { meta, payload } = await dispatch(CreateSurvey(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    await dispatch(GetSurveys(campaignInfo.id));
    dispatch(setSelectedSurvey(String(payload.surveyId)));
  };

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const actualSurvey = surveyList.find((i) => i.id === draggableId);

    if (
      (!(
        actualSurvey.type === Number(ECampaignSurveyType.Final) ||
        actualSurvey.type === Number(ECampaignSurveyType.Welcome)
      ) &&
        destination.index === 0) ||
      destination.index === surveyList.length - 1
    ) {
      return;
    }

    const newItems = reorderDragDrop(
      surveyList,
      source.index,
      destination.index
    );
    setSurveyList(newItems);
    const newItemsSorted = [...newItems].sort(
      (a, b) => a.position - b.position
    );
    dispatch(
      ChangeCampaignSurveyPositions({
        data: newItemsSorted,
        id: campaignInfo.id,
      })
    );
  };

  const handleRemove = async () => {
    const removeThunk = await dispatch(RemoveCampaignSurvey(selectedSurvey));
    if (removeThunk.meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    const { meta, payload } = await dispatch(GetSurveys(campaignInfo.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    dispatch(setSelectedSurvey(String(payload[0].id)));
  };

  const handleSetOpen = (questionId: number) => {
    dispatchContext({
      type: EAppReducerTypes.SET_UNSAVED_MODAL_DATA,
      payload: {
        isOpen: true,
        questionId,
      },
    });
  };

  const handleClickSurvey = (id: number) => {
    if (selectedSurvey === id) {
      return;
    }

    if (formState.isDirty) {
      handleSetOpen(id);
      return;
    }
    handleClickSuccess(id);
  };

  const fetchSurveyData = useCallback(
    async (surveyId: number) => {
      await Promise.all([
        dispatch(GetCampaignSurveyById(surveyId)),
        dispatch(GetCampaignSurveyTemplateById(surveyId)),
        dispatch(GetSurveyLogic(surveyId)),
      ]);

      dispatch(setCampaignLoading(false));
    },
    [dispatch]
  );

  const handleClickSuccess = useCallback(
    (id: number) => {
      dispatch(setCampaignLoading(true));
      dispatch(setSelectedSurvey(id));
    },
    [dispatch]
  );

  const getOptionIcon = (type: number) => {
    const Comp = CampaignSurveyIcons[type];
    return (
      <Box mr={1} display="flex" alignItems="center">
        <Comp height={20} width={20} color="white" />
      </Box>
    );
  };

  useEffect(() => {
    if (!campaignSurveys.length) {
      return;
    }
    setSurveyList(campaignSurveys);
  }, [campaignSurveys, dispatch]);

  useEffect(() => {
    if (selectedSurvey) {
      fetchSurveyData(selectedSurvey);
    }
  }, [fetchSurveyData, selectedSurvey]);

  useEffect(() => {
    if (campaignDetails.isSuccess && campaignDetails.questionId) {
      handleClickSuccess(campaignDetails.questionId);
      dispatchContext({
        type: EAppReducerTypes.SET_UNSAVED_MODAL_DATA,
        payload: {
          questionId: 0,
          isOpen: false,
          isSuccess: false,
        },
      });
    }
  }, [
    campaignDetails?.id,
    campaignDetails?.isSuccess,
    campaignDetails?.questionId,
    dispatchContext,
    handleClickSuccess,
  ]);

  return (
    <Box p={1}>
      <Box mt={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          startIcon={<PlusIcon height={20} />}
        >
          Add content
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={addContentMenuOpen}
          onClose={handleClose}
        >
          <Box p={2}>
            <Typography fontWeight="bold">Questions</Typography>
          </Box>
          {!alreadyHasType(ECampaignSurveyType.Welcome) && (
            <MenuItem
              id={ECampaignSurveyType.Welcome}
              onClick={handleClickContentAdd}
            >
              <HandIcon height={20} width={40} />
              Welcome
            </MenuItem>
          )}

          <MenuItem
            id={ECampaignSurveyType.SingleChoice}
            onClick={handleClickContentAdd}
          >
            <CircleIcon height={20} width={40} />
            Select One
          </MenuItem>
          <MenuItem
            id={ECampaignSurveyType.MultipleChoice}
            onClick={handleClickContentAdd}
          >
            <CheckIcon height={20} width={40} />
            Select Multiple
          </MenuItem>
          <MenuItem
            id={ECampaignSurveyType.Comment}
            onClick={handleClickContentAdd}
          >
            <ChatIcon height={20} width={40} />
            Comment
          </MenuItem>
          {!alreadyHasType(ECampaignSurveyType.ContactInformation) && (
            <MenuItem
              id={ECampaignSurveyType.ContactInformation}
              onClick={handleClickContentAdd}
            >
              <UserIcon height={20} width={40} />
              Contact Information
            </MenuItem>
          )}
          <Box p={2}>
            <Typography fontWeight="bold">Ratings</Typography>
          </Box>

          {!alreadyHasType(ECampaignSurveyType.Nps) && (
            <MenuItem
              id={ECampaignSurveyType.Nps}
              onClick={handleClickContentAdd}
            >
              <ChartIcon height={20} width={40} />
              NPS
            </MenuItem>
          )}
          {!alreadyHasType(ECampaignSurveyType.ServiceQualityScore) && (
            <MenuItem
              id={ECampaignSurveyType.ServiceQualityScore}
              onClick={handleClickContentAdd}
            >
              <SmileIcon height={20} width={40} />
              eNPS
            </MenuItem>
          )}

          {!alreadyHasType(ECampaignSurveyType.CustomerEffortScore) && (
            <MenuItem
              id={ECampaignSurveyType.CustomerEffortScore}
              onClick={handleClickContentAdd}
            >
              <PieChartIcon height={20} width={40} />
              Customer Effort score
            </MenuItem>
          )}

          {!alreadyHasType(ECampaignSurveyType.CustomerSatisfactionScore) && (
            <MenuItem
              id={ECampaignSurveyType.CustomerSatisfactionScore}
              onClick={handleClickContentAdd}
            >
              <SatisfactionIcon height={20} width={40} />
              Customer Satisfaction score
            </MenuItem>
          )}

          <MenuItem
            id={ECampaignSurveyType.Rating}
            onClick={handleClickContentAdd}
          >
            <RatingIcon height={20} width={40} />
            Custom
          </MenuItem>

          {!alreadyHasType(ECampaignSurveyType.CustomStar) && (
            <MenuItem
              id={ECampaignSurveyType.CustomStar}
              onClick={handleClickContentAdd}
            >
              <StarIcon height={20} width={40} />
              Star
            </MenuItem>
          )}
        </Menu>
      </Box>
      <List>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {surveyList.map((survey, index) => {
                  const getLabel = () => {
                    let label =
                      survey.title || CampaignSurveyTypeList[survey.type];

                    if (label.length > 30) {
                      return label.substring(0, 30) + "...";
                    } else {
                      return label;
                    }
                  };
                  return (
                    <Draggable
                      isDragDisabled={
                        survey.type === Number(ECampaignSurveyType.Welcome) ||
                        survey.type === Number(ECampaignSurveyType.Final)
                      }
                      key={survey.id}
                      draggableId={survey.id}
                      index={index}
                    >
                      {(provided) => (
                        <ListItemButton
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          selected={selectedSurvey === survey.id}
                          onClick={() => handleClickSurvey(survey.id)}
                        >
                          <Box
                            display="flex"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width="100%"
                          >
                            <Box display={"flex"} alignItems={"center"}>
                              <Box
                                px={1}
                                display="flex"
                                justifyContent={"center"}
                                alignItems={"center"}
                                color="primary.secondary"
                                sx={{
                                  backgroundColor: "primary.main",
                                  borderRadius: "4px",
                                }}
                              >
                                {getOptionIcon(survey.type)}
                                <Typography color={"white"} fontWeight={600}>
                                  {index + 1}
                                </Typography>
                              </Box>
                              <Typography fontWeight="600" fontSize={14} ml={1}>
                                {getLabel()}
                              </Typography>
                            </Box>
                            {String(survey.type) !==
                              ECampaignSurveyType.Final && (
                              <Box>
                                <IconButton
                                  onClick={() => setWarningOpen(true)}
                                >
                                  <TrashIcon height={20} width={20} />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                        </ListItemButton>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <SharedDialog
          open={warningOpen}
          setOpen={setWarningOpen}
          onSuccess={handleRemove}
          textConfig={deleteCampaignSurveyWarningConfig}
        />
      </List>
    </Box>
  );
};

export default LeftSidebar;
