import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import BasicTabs from "shared/ui/Tabs";
import { campaignDetailsTabList } from "./constants";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import {
  GetCampaignById,
  GetCampaignTriggers,
  GetSurveys,
  GetTemplates,
} from "store/slicers/campaignDetail";
import { Button, Typography } from "@mui/material";
import SharedDialog from "shared/ui/Dialog";
import { deleteNoteDialogOptions } from "../FeedBacks/components/FeedbackDetails/FeedbackDetailsBottomRight/constants";
import { GlobalContext } from "App";
import { EAppReducerTypes } from "shared/helpers/AppContext";

const CampaignDetail = () => {
  const { id } = useParams();
  const dispatch = useAsyncDispatch();
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);
  const {
    contextInitialState: { campaignDetails },
    dispatchContext,
  } = useContext(GlobalContext);

  const handleDelete = () => {};

  const handleSetOpen = (val) => {
    setUnsavedModalOpen(val);
    dispatchContext({
      type: EAppReducerTypes.Set_unsaved_modal_open,
      payload: val,
    });
  };

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

  useEffect(() => {
    setUnsavedModalOpen(campaignDetails.isOpen);
  }, [campaignDetails?.isOpen]);

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
      <SharedDialog
        open={unsavedModalOpen}
        setOpen={handleSetOpen}
        onSuccess={handleDelete}
        textConfig={deleteNoteDialogOptions}
      />
    </Box>
  );
};

export default CampaignDetail;
