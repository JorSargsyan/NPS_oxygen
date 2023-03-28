import {
  Button,
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
  GetSurveys,
  RemoveCampaignSurvey,
  selectCampaignInfo,
  selectCampaignSurveys,
  selectSelectedSurvey,
  setSelectedSurvey,
} from "store/slicers/campaignDetail";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { useCallback, useEffect, useMemo, useState } from "react";
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

const LeftSidebar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const addContentMenuOpen = Boolean(anchorEl);
  const dispatch = useAsyncDispatch();
  const [warningOpen, setWarningOpen] = useState(false);
  const campaignSurveys = useSelector(selectCampaignSurveys);
  const [surveyList, setSurveyList] = useState<ICampaignSurvey[]>([]);
  const selectedSurvey = useSelector(selectSelectedSurvey);
  const campaignInfo = useSelector(selectCampaignInfo);

  const addContentConfig = useMemo(() => {
    return {
      hasWelcome: surveyList.find(
        (i) => i.type === Number(ECampaignSurveyType.Welcome)
      ),
      hasNPS: surveyList.find(
        (i) => i.type === Number(ECampaignSurveyType.Nps)
      ),
      hasServiceQualityScore: surveyList.find(
        (i) => i.type === Number(ECampaignSurveyType.ServiceQualityScore)
      ),
    };
  }, [surveyList]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickContentAdd = async (e) => {
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
      isRequired: false,
    };

    const { meta, payload } = await dispatch(CreateSurvey(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    await dispatch(GetSurveys(campaignInfo.id));

    await dispatch(setSelectedSurvey(String(payload.surveyId)));

    fetchSurveyData(payload.surveyId);
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
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
    const { meta } = await dispatch(RemoveCampaignSurvey(selectedSurvey));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    dispatch(GetSurveys(campaignInfo.id));
  };

  const handleClickSurvey = (id: number) => {
    if (selectedSurvey === id) {
      return;
    }
    dispatch(setSelectedSurvey(String(id)));
    fetchSurveyData(id);
  };

  const fetchSurveyData = useCallback(
    (surveyId: number) => {
      Promise.all([
        dispatch(GetCampaignSurveyById(surveyId)),
        dispatch(GetCampaignSurveyTemplateById(surveyId)),
      ]);
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
    dispatch(setSelectedSurvey(campaignSurveys[0]?.id));
    fetchSurveyData(campaignSurveys[0]?.id);
  }, [campaignSurveys, dispatch, fetchSurveyData]);

  return (
    <Box>
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
          {!addContentConfig.hasWelcome && (
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
            Single choice
          </MenuItem>
          <MenuItem
            id={ECampaignSurveyType.MultipleChoice}
            onClick={handleClickContentAdd}
          >
            <CheckIcon height={20} width={40} />
            Multiple choice
          </MenuItem>
          <MenuItem
            id={ECampaignSurveyType.Comment}
            onClick={handleClickContentAdd}
          >
            <ChatIcon height={20} width={40} />
            Comment
          </MenuItem>
          {!addContentConfig.hasNPS && (
            <MenuItem
              id={ECampaignSurveyType.Nps}
              onClick={handleClickContentAdd}
            >
              <ChartIcon height={20} width={40} />
              NPS
            </MenuItem>
          )}
          {!addContentConfig.hasServiceQualityScore && (
            <MenuItem
              id={ECampaignSurveyType.ServiceQualityScore}
              onClick={handleClickContentAdd}
            >
              <SmileIcon height={20} width={40} />
              Service quality score
            </MenuItem>
          )}
          <MenuItem
            id={ECampaignSurveyType.Rating}
            onClick={handleClickContentAdd}
          >
            <StarIcon height={20} width={40} />
            Rating
          </MenuItem>
        </Menu>
      </Box>
      <List>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {surveyList.map((survey, index) => {
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
                            <Box display={"flex"}>
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
                              <Typography fontSize={14} ml={1}>
                                {survey.title ||
                                  CampaignSurveyTypeList[survey.type]}
                              </Typography>
                            </Box>
                            {String(survey.type) !==
                              ECampaignSurveyType.Final && (
                              <Box mt={1}>
                                <TrashIcon
                                  onClick={() => setWarningOpen(true)}
                                  height={20}
                                  width={20}
                                />
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
