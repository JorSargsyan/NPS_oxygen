import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import EmailIcon from "@heroicons/react/24/outline/AtSymbolIcon";
import SmsIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { selectCampaignInfo } from "store/slicers/campaignDetail";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import { useNavigate } from "react-router-dom";
import { selectActiveTemplate } from "store/slicers/surveyPreview";

const Distribution = () => {
  const activeTemplate = useSelector(selectActiveTemplate)
  const navigate = useNavigate();
  const campaignInfo = useSelector(selectCampaignInfo);

  const handleShareSMS = () => {
    navigate(`/admin/sms-share/${campaignInfo.id}`);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              titleTypographyProps={{ textAlign: "center" }}
              title="Get the link"
            />
            <CardContent sx={{ height: 180 }}>
              <TextField
                fullWidth
                label="URL"
                value={campaignInfo?.shareLink + `?t=${activeTemplate}`}
              />
              <Box display="flex" mt={2} gap={1} flexWrap={"wrap"}>
                <FacebookShareButton url={campaignInfo?.shareLink}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <LinkedinShareButton url={campaignInfo?.shareLink}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                <TelegramShareButton url={campaignInfo?.shareLink}>
                  <TelegramIcon size={40} round />
                </TelegramShareButton>
                <TwitterShareButton url={campaignInfo?.shareLink}>
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <ViberShareButton url={campaignInfo?.shareLink}>
                  <ViberIcon size={40} round />
                </ViberShareButton>
                <WhatsappShareButton url={campaignInfo?.shareLink}>
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card onClick={handleShareSMS}>
            <CardHeader
              titleTypographyProps={{ textAlign: "center" }}
              title="Share via SMS"
            />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <SmsIcon height={100} color="#0E4EB1" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              titleTypographyProps={{ textAlign: "center" }}
              title="Share via Email"
            />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <EmailIcon height={100} color="#0E4EB1" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              titleTypographyProps={{ textAlign: "center" }}
              title="Push Notifications"
            />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <BellIcon height={100} color="#0E4EB1" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Distribution;
