import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import {
  selectCampaignInfo,
  selectCampaignSurveys,
} from "store/slicers/campaignDetail";

const QuestionTab = () => {
  const campaignSurveys = useSelector(selectCampaignSurveys);

  const handleRemove = (rowId: number) => {
    console.log(rowId);
  };

  return (
    <List>
      {campaignSurveys.map((survey, index) => {
        return (
          <ListItemButton>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              width="100%"
            >
              <Box display={"flex"}>
                <Typography color="primary.main" fontWeight={600}>
                  {index + 1}.
                </Typography>
                <Typography ml={1}>{survey.title || survey.type}</Typography>
              </Box>
              <TrashIcon onClick={() => handleRemove(survey.id)} height={20} />
            </Box>
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default QuestionTab;
