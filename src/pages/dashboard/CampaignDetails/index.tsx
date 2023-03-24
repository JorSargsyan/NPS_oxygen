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

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={2}>
      <BasicTabs centered={false} tabsData={campaignDetailsTabList} />
    </Box>
  );
};

export default CampaignDetail;
