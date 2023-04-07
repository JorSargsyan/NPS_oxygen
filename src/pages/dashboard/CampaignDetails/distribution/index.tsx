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

const Distribution = () => {
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
            <CardHeader title="Get the link" />
            <CardContent sx={{ height: 180 }}>
              <TextField
                fullWidth
                label="URL"
                value={campaignInfo?.shareLink}
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
            <CardHeader title="Share via SMS" />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box
                display="flex"
                sx={{ position: "absolute", right: -30, top: 20 }}
                justifyContent={"center"}
              >
                <SmsIcon height={200} color="#73a110" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Share via Email" />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box
                display="flex"
                sx={{ position: "absolute", right: -30, top: 20 }}
                justifyContent={"center"}
              >
                <EmailIcon height={200} color="#73a110" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Push Notifications" />
            <CardContent
              sx={{ height: 180, overflow: "hidden", position: "relative" }}
            >
              <Box display="flex" justifyContent={"center"}>
                <Box
                  display="flex"
                  sx={{ position: "absolute", right: -30, top: 20 }}
                  justifyContent={"center"}
                >
                  <BellIcon height={200} color="#73a110" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Distribution;
