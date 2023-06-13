import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
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
  selectTemplates,
} from "store/slicers/campaignDetail";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import AddEditTemplate from "./AddEditTemplate";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useTranslation from "shared/helpers/hooks/useTranslation";

const Templates = () => {
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTemplateData, setEditTemplateData] = useState<ITemplate | null>(
    null
  );

  const skeletonArr = new Array(5).fill("");
  const t = useTranslation();

  const templateList = useSelector(selectTemplates);
  const dispatch = useAsyncDispatch();

  const editTemplate = (templateData: ITemplate) => {
    setEditTemplateData(templateData);
    setDrawerOpen(true);
  };

  const handleSuccess = () => {
    setDrawerOpen(false);
    setEditTemplateData(null);
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
          label: "edit",
          onClick: () => editTemplate(rowData),
        },
        { label: "delete", onClick: () => deleteTemplate(rowData) },
      ];
    },
    [deleteTemplate]
  );

  return (
    <Box p={2} mx={2}>
      <Box my={2}>
        <Button
          variant="outlined"
          startIcon={
            <SvgIcon>
              <PlusIcon />
            </SvgIcon>
          }
          onClick={() => setDrawerOpen(true)}
        >
          <Typography>{t("add")}</Typography>
        </Button>
      </Box>
      <Box flexWrap={"wrap"} display="flex" gap="14px">
        {templateList?.length
          ? templateList
              .filter((i) => i.id)
              ?.map((item) => {
                return (
                  <Card
                    sx={{
                      mb: 2,
                      width: "19%",
                    }}
                    key={item.id}
                  >
                    <CardContent>
                      <Typography color={item.questionColor}>
                        {t("question")}
                      </Typography>
                      <Typography color={item.answerColor}>
                        {t("answer")}
                      </Typography>
                      <Typography color={item.buttonTextColor}>
                        {t("button_text")}
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
          : skeletonArr.map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={"19%"}
                height="215px"
              />
            ))}
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
