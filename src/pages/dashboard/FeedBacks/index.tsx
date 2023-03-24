import CommentIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon";
import { MenuItem, Select, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { defaultFilterValues } from "resources/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import SharedDialog from "shared/ui/Dialog";
import RightDrawer from "shared/ui/Drawer";
import BasicTable from "shared/ui/Table";
import { IFeedback, IFeedbackCauseAndMood } from "store/interfaces/feedback";
import {
  GetFeedbackCauseAndMoodCategoriesList,
  GetFeedbacks,
  selectFeedbacks,
} from "store/slicers/feedback";
import FeedbackStatusDrawer from "./components/FeedbackStatusDrawer";
import ViewComments from "./components/ViewComments";
import {
  feedbackColumns,
  feedbackStatusList,
  viewCommentsDialogConfig,
} from "./constants";
import { changeFeedbackStatus } from "./helpers";

export interface IActiveRow {
  type: number;
  data: IFeedbackCauseAndMood;
  rowId: number;
  state: number;
}

const Feedbacks = () => {
  const [activeRow, setActiveRow] = useState<IActiveRow>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCommentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const dispatch = useAsyncDispatch();
  const feedbacks = useSelector(selectFeedbacks);

  const handleOpenCommentViewDialog = (row: IFeedback) => {
    setSelectedFeedbackId({ id: row.id, data: row.comments });
    setCommentDialogOpen(true);
  };
  const methods = useForm({
    defaultValues: { config: defaultFilterValues },
  });

  const viewCommentColumn = {
    label: "Comment",
    layout: (row: IFeedback) => {
      if (!row?.comments?.length) {
        return;
      }
      return (
        <Box
          onClick={() => handleOpenCommentViewDialog(row)}
          textAlign="center"
        >
          <SvgIcon sx={{ cursor: "pointer", color: "primary.main" }}>
            <CommentIcon />
          </SvgIcon>
        </Box>
      );
    },
  };

  const statusColumn = {
    label: "Status",
    layout: (row: IFeedback) => {
      return (
        <Box>
          <Select
            size="small"
            value={row.feedbackStatus.id}
            onChange={(e) =>
              changeFeedbackStatus({
                value: e.target.value,
                rowId: row.id,
                dispatch,
                setDrawerOpen,
                setActiveRow,
                refetchFeedbacks,
              })
            }
          >
            {feedbackStatusList.map((feedbackStatus, index) => {
              return (
                <MenuItem key={index} value={feedbackStatus.value}>
                  {feedbackStatus.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      );
    },
  };

  const refetchFeedbacks = () => {
    dispatch(GetFeedbacks(methods.watch("config")));
  };

  const handleChangeSelected = (ids: number[]) => {
    // console.log(ids);
  };

  const handleViewFeedback = (id: number) => {
    const url = `${window.location.origin}/feedback/${id}`;
    window.open(url, "_blank");
  };

  const getActions = (row: IFeedback) => {
    return [
      {
        label: "View",
        onClick: () => handleViewFeedback(row.id),
      },
    ];
  };

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const handleCloseCommentDialog = () => {
    setSelectedFeedbackId(null);
    setCommentDialogOpen(false);
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    refetchFeedbacks();
  };

  useEffect(() => {
    dispatch(GetFeedbacks(defaultFilterValues));
    dispatch(GetFeedbackCauseAndMoodCategoriesList());
  }, [dispatch]);

  return (
    <Box p={4}>
      <Typography variant="h3">Feedbacks</Typography>
      <BasicTable<IFeedback>
        selectable
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        columns={[...feedbackColumns, statusColumn, viewCommentColumn]}
        paginatedData={feedbacks}
        onChange={refetchFeedbacks}
        onChangeSelected={handleChangeSelected}
        getActions={getActions}
        hasSearchInput
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title="Edit Feedback Status"
      >
        {activeRow?.type && (
          <FeedbackStatusDrawer
            editData={activeRow}
            onSuccess={onFormSuccess}
          />
        )}
      </RightDrawer>
      {isCommentDialogOpen && (
        <SharedDialog
          open={isCommentDialogOpen}
          setOpen={setCommentDialogOpen}
          textConfig={viewCommentsDialogConfig}
          handleCloseCb={handleCloseCommentDialog}
          hasActions={false}
        >
          <ViewComments editData={selectedFeedbackId} />
        </SharedDialog>
      )}
    </Box>
  );
};

export default Feedbacks;
