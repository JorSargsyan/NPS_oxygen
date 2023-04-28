import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import {
  selectSurveyInfo,
  selectTemplates,
} from "store/slicers/campaignDetail";
import BasicSelect from "shared/ui/Select";
import { FormProvider, useForm } from "react-hook-form";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Paper,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import MoreIcon from "@heroicons/react/24/outline/EllipsisHorizontalIcon";
import DotsMenu from "shared/ui/DotsMenu";
import { IAction } from "shared/ui/Table/constants";
import { ITemplate } from "store/interfaces/campaignDetails";

const Templates = () => {
  const methods = useForm({
    defaultValues: {
      theme: 1,
    },
  });
  const [editTemplateID, setEditTemplateID] = useState("1");
  const themeId = methods.watch("theme");
  const templateList = useSelector(selectTemplates);
  const surveyDetails = useSelector(selectSurveyInfo);

  const handleClickAction = useCallback(
    (action: IAction<ITemplate>, row: ITemplate) => {
      action?.onClick(row);
    },
    []
  );

  const editTemplate = (id: number) => {
    console.log(id);
  };

  const getActions = useCallback((rowData: ITemplate) => {
    return [
      {
        label: "Edit",
        onClick: () => editTemplate(rowData.id),
      },
    ];
  }, []);

  const template = useMemo(() => {
    return templateList.find((i) => i.id === themeId);
  }, [templateList, themeId]);

  return (
    <Box>
      {editTemplateID ? (
        <Box>
          {templateList?.length
            ? templateList?.map((item) => {
                return (
                  <Card
                    sx={{
                      mb: 2,
                      border:
                        surveyDetails?.template?.id === item.id
                          ? "3px solid"
                          : "none",
                      borderColor: "primary.main",
                    }}
                    key={item.id}
                  >
                    <CardContent>
                      <Typography color={item.quesstionColor}>
                        Question
                      </Typography>
                      <Typography color={item.answerColor}>Answer</Typography>
                      <Typography color={item.buttonTextColor}>
                        Button Text
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          height: 12,
                          width: 48,
                          backgroundColor: item.buttonColor,
                        }}
                      ></Box>
                    </CardContent>
                    <Divider />
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 3,
                      }}
                    >
                      <Typography>{item.name}</Typography>
                      <DotsMenu<ITemplate>
                        actions={getActions(item)}
                        onActionClick={handleClickAction}
                        row={item}
                      />
                    </CardActions>
                  </Card>
                );
              })
            : null}
        </Box>
      ) : (
        <Box display={"flex"} flexWrap={"wrap"}>
          <Box
            display="flex"
            alignItems={"center"}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography>Button Color</Typography>
            <IconButton>
              <Box
                component={Paper}
                height={25}
                width={25}
                sx={{
                  backgroundColor: template?.buttonColor,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems={"center"}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography>Button Text Color</Typography>
            <IconButton>
              <Box
                component={Paper}
                height={25}
                width={25}
                sx={{
                  backgroundColor: template?.buttonTextColor,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems={"center"}
            width="100%"
            justifyContent={"space-between"}
          >
            <Typography>Question Color</Typography>
            <IconButton>
              <Box
                component={Paper}
                height={25}
                width={25}
                sx={{
                  backgroundColor: template?.quesstionColor,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
          <Box
            display="flex"
            width="100%"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>Answer Color</Typography>
            <IconButton>
              <Box
                component={Paper}
                height={25}
                width={25}
                sx={{
                  backgroundColor: template?.answerColor,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Templates;
