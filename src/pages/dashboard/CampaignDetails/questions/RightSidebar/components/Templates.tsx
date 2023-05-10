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
import { useSelector } from "react-redux";
import DotsMenu from "shared/ui/DotsMenu";
import RightDrawer from "shared/ui/Drawer";
import { IAction } from "shared/ui/Table/constants";
import { ITemplate } from "store/interfaces/campaignDetails";
import {
  DeleteCustomTemplate,
  GetTemplates,
  selectSurveyInfo,
  selectTemplates,
  setSelectedTemplate,
} from "store/slicers/campaignDetail";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEditTemplate from "./AddEditTemplate";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Templates = ({ setSelectedTemplateID, selectedTemplateID }) => {
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTemplateData, setEditTemplateData] = useState<ITemplate | null>(
    null
  );

  const templateList = useSelector(selectTemplates);
  const surveyDetails = useSelector(selectSurveyInfo);
  const dispatch = useAsyncDispatch();

  const editTemplate = (templateData: ITemplate) => {
    setEditTemplateData(templateData);
    setDrawerOpen(true);
  };

  const handleSuccess = () => {
    setDrawerOpen(false);
    setEditTemplateData(null);
  };

  const selectTemplate = async ({ id, ...rest }: ITemplate) => {
    if (!id) {
      return;
    }
    await dispatch(
      setSelectedTemplate({ ...rest, id: surveyDetails?.template?.id })
    );
    setSelectedTemplateID(id);
  };

  const deleteTemplate = useCallback(
    async (rowData: ITemplate) => {
      const { meta } = await dispatch(DeleteCustomTemplate(rowData.id));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }

      await dispatch(GetTemplates(Number(id)));
      toast.success("Template removed successfully");
    },
    [dispatch, id]
  );

  const handleClickAction = useCallback(
    (action: IAction<ITemplate>, row: ITemplate) => {
      action?.onClick(row);
    },
    []
  );

  const getActions = useCallback(
    (rowData: ITemplate) => {
      return [
        {
          label: "Edit",
          onClick: () => editTemplate(rowData),
        },
        { label: "Delete", onClick: () => deleteTemplate(rowData) },
      ];
    },
    [deleteTemplate]
  );

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
          <Typography>Add Template</Typography>
        </Button>
      </Box>
      <Box>
        {templateList?.length
          ? templateList
              .filter((i) => i.id)
              ?.map((item) => {
                return (
                  <Card
                    onClick={() => selectTemplate(item)}
                    sx={{
                      mb: 2,
                      border:
                        selectedTemplateID === item.id ? "3px solid" : "none",
                      borderColor: "primary.main",
                    }}
                    key={item.id}
                  >
                    <CardContent>
                      <Typography color={item.questionColor}>
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
        <AddEditTemplate
          onSuccess={handleSuccess}
          editData={editTemplateData}
        />
      </RightDrawer>
    </Box>
  );
};

export default Templates;
