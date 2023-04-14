import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Menu,
  MenuItem,
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
import UploadIcon from "@heroicons/react/24/outline/ArrowUpOnSquareIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { ITemplate } from "store/interfaces/campaignDetails";

const DesignTab = () => {
  const surveyInfo = useSelector(selectSurveyInfo);
  const dispatch = useAsyncDispatch();
  const campaignInfo = useSelector(selectCampaignInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpen, onMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>();
  const [uploadPic, setUploadPic] = useState<string | ArrayBuffer>("");
  const [removeableImage, setRemovableImage] = useState(false);
  const [uploadableImage, setUploadableImage] = useState(false);

  const handleChangeImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      setUploadPic(reader.result);
      setUploadableImage(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadOpen = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async () => {
    const [prefix, base64Image] = uploadPic.toString().split(",");

    const extension = prefix.replace("data:image/", ".").split(";")[0];

    await dispatch(
      UpdateSurveyTemplate({
        data: {
          logoImage: {
            base64Image,
            extension: extension,
            removeImage: false,
          },
        },
        id: surveyInfo.template.id,
      })
    );
  };

  const removeSurveyTemplate = async () => {
    const { meta } = await dispatch(
      DeleteSurveyTemplate(surveyInfo.template.id)
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    setRemovableImage(false);
    dispatch(GetSurveys(campaignInfo.id));
    toast.success("Survey Template removed succesfully");
  };

  const removeCampaignTemplate = async () => {
    const { meta } = await dispatch(DeleteCampaignTemplate(campaignInfo.id));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    setRemovableImage(false);
    dispatch(GetSurveys(campaignInfo.id));
    toast.success("Campaign Template removed succesfully");
  };

  const handleApply = async () => {
    onMenuOpen(false);

    if (removeableImage) {
      removeSurveyTemplate();
      return;
    }
    await uploadImage();
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
    setUploadPicture(payloadTyped.logoImage);
    toast.success("Template applied succesfully");
  };

  const handleApplyAll = async () => {
    onMenuOpen(false);
    if (removeableImage) {
      removeCampaignTemplate();
      return;
    }
    await uploadImage();
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
    setUploadPicture(payloadTyped.logoImage);
    toast.success("Template applied succesfully");
  };

  const handleRemoveImage = () => {
    setRemovableImage(true);
    setUploadPic("");
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    onMenuOpen(true);
  };

  const setUploadPicture = useCallback((logoImage: string) => {
    if (!logoImage) {
      setUploadPic("");
      return;
    }
    setUploadPic(`${EBaseUrl.MediaTemplateURL}/${logoImage}`);
  }, []);

  useEffect(() => {
    if (!surveyInfo.details?.id) {
      return;
    }
    if (surveyInfo.template.logoImage) {
      setUploadPicture(surveyInfo.template.logoImage);
    } else {
      setUploadPic(defaultImg);
    }

    setUploadableImage(false);
  }, [
    setUploadPicture,
    surveyInfo?.details?.id,
    surveyInfo?.template?.logoImage,
  ]);

  return (
    <Box p={2}>
      <Card>
        <CardContent>
          <Box
            minHeight={140}
            borderRadius={"10px"}
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            sx={{ backgroundColor: "divider" }}
          >
            {uploadPic ? (
              <img
                height="100%"
                width="100%"
                style={{ borderRadius: 10 }}
                src={uploadPic.toString()}
                alt="templateImage"
              />
            ) : (
              <Typography fontSize={18}>No image</Typography>
            )}
          </Box>
          <Box display="flex" justifyContent={"flex-end"}>
            <Tooltip title={"Upload / Change Image"}>
              <IconButton onClick={handleFileUploadOpen}>
                <UploadIcon height={20} />
              </IconButton>
            </Tooltip>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
              hidden
            />
            <Tooltip title={"Remove Image"}>
              <IconButton onClick={handleRemoveImage}>
                <TrashIcon height={20} />
              </IconButton>
            </Tooltip>
          </Box>
          {(uploadableImage || removeableImage) && (
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
