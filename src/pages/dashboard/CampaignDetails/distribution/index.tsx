import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SmsDistributionForm from "./SmsDistributionForm";
import { useSelector } from "react-redux";
import { selectCampaignInfo } from "store/slicers/campaignDetail";

const Distribution = () => {
  const [showSmsForm, setShowSmsForm] = useState(false);
  const campaignInfo = useSelector(selectCampaignInfo);

  const handleCopy = () => {
    const text = navigator.clipboard.readText();
  };

  return (
    <Box p={2}>
      <Card>
        <CardHeader title="Get the link" />
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <TextField fullWidth label="URL" value={campaignInfo.shareLink} />
            </Grid>
          </Grid>
          <Box mt={4} display="flex" alignItems={"center"}>
            <Tooltip title="After activation of this function the link of the survey can be sent via SMS as well.">
              <Typography fontSize={16} fontWeight={500}>
                Distribute the link via SMS
              </Typography>
            </Tooltip>
            <Box ml={2}>
              <Switch
                checked={showSmsForm}
                onChange={() => setShowSmsForm((state) => !state)}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
      {showSmsForm && (
        <Box mt={4}>
          <Card>
            <CardContent>
              <SmsDistributionForm />
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Distribution;
