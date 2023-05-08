import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DotsMenu from "shared/ui/DotsMenu";
import RightDrawer from "shared/ui/Drawer";
import { IAction } from "shared/ui/Table/constants";
import { ITemplate } from "store/interfaces/campaignDetails";
import {
  selectSurveyInfo,
  selectTemplates,
} from "store/slicers/campaignDetail";
import AddEditTheme from "./AddEditTheme";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const Templates = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTemplateData, setEditTemplateData] = useState<ITemplate>(null);
  const methods = useForm({
    defaultValues: {
      theme: 1,
    },
  });

  const themeId = methods.watch("theme");
  const templateList = useSelector(selectTemplates);
  const surveyDetails = useSelector(selectSurveyInfo);

  const handleClickAction = useCallback(
    (action: IAction<ITemplate>, row: ITemplate) => {
      action?.onClick(row);
    },
    []
  );

  const editTemplate = (templateData: ITemplate) => {
    setEditTemplateData(templateData);
    setDrawerOpen(true);
  };

  const getActions = useCallback((rowData: ITemplate) => {
    return [
      {
        label: "Edit",
        onClick: () => editTemplate(rowData),
      },
    ];
  }, []);

  const handleSuccess = () => {};

  return (
    <Box>
      <Box my={1}>
        <Button
          variant="outlined"
          startIcon={
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          }
          onClick={() => setDrawerOpen(true)}
        >
          <Typography>Add Theme</Typography>
        </Button>
      </Box>
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

      <RightDrawer
        width={400}
        open={drawerOpen}
        setOpen={setDrawerOpen}
        title={"Add theme"}
      >
        <AddEditTheme onSuccess={handleSuccess} editData={editTemplateData} />
      </RightDrawer>
    </Box>
  );
};

export default Templates;
