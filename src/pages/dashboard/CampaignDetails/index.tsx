import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import BasicTabs from "shared/ui/Tabs";
import { campaignDetailsTabList } from "./constants";
import { useCallback, useEffect } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  GetCampaignById,
  GetCampaignTriggers,
  GetSurveys,
  GetTemplates,
} from "store/slicers/campaignDetail";
import { Button, Typography } from "@mui/material";

const CampaignDetail = () => {
  const { id } = useParams();
  const dispatch = useAsyncDispatch();

  const init = useCallback(() => {
    Promise.all([
      dispatch(GetCampaignById(Number(id))),
      dispatch(GetTemplates(Number(id))),
      dispatch(GetSurveys(Number(id))),
      dispatch(GetCampaignTriggers()),
    ]);
  }, [dispatch, id]);

  const handleSubmit = () => {};

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box>
      <Box display="flex">
        <BasicTabs
          tabsData={campaignDetailsTabList}
          Content={() => {
            return (
              <Box
                sx={{
                  position: "absolute",
                  right: 10,
                }}
                onClick={handleSubmit}
              >
                <Button variant="contained">
                  <Typography>Save changes</Typography>
                </Button>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default CampaignDetail;
