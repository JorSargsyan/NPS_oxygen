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
import {
  EFeedbackStatus,
  EFeedbackStatusesModalTypes,
} from "store/enums/feedbacks.enum";
import { ERequestStatus } from "store/enums/index.enum";
import { IFeedback, IFeedbackCauseAndMood } from "store/interfaces/feedback";
import {
  ChangeFeedbackStatus,
  GetFeedbackCauseAndMood,
  GetFeedbackCauseAndMoodCategoriesList,
  GetFeedbacks,
  selectFeedbacks,
} from "store/slicers/feedback";
import FeedbackStatusDrawer from "./components/FeedbackStatusDrawer";
import ViewComments from "./components/ViewComments";
import { feedbackColumns, viewCommentsDialogConfig } from "./constants";
import CommentIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon";

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

  const handleChangeStatus = async (e, rowId) => {
    const value = e.target.value;
    const { meta } = await dispatch(
      ChangeFeedbackStatus({
        id: rowId,
        formData: {
          state: value,
        },
      })
    );

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      const causeAndMooRes = await dispatch(GetFeedbackCauseAndMood(rowId));
      setDrawerOpen(true);
      if (causeAndMooRes.meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      if (
        value === EFeedbackStatus.Postponed ||
        value === EFeedbackStatus.Misrated
      ) {
        setActiveRow({
          type: EFeedbackStatusesModalTypes.Requires_Cause,
          data: causeAndMooRes.payload,
          rowId,
          state: value,
        });
      } else if (
        value === EFeedbackStatus.Resolved ||
        value === EFeedbackStatus.Not_Resolved
      ) {
        setActiveRow({
          type: EFeedbackStatusesModalTypes.Requires_Both,
          data: causeAndMooRes.payload,
          rowId,
          state: value,
        });
      } else {
        setActiveRow(undefined);
      }
    } else {
      refetchFeedbacks();
    }
  };

  const handleOpenCommentViewDialog = (row: IFeedback) => {
    setSelectedFeedbackId({ id: row.id, data: row.comments });
    setCommentDialogOpen(true);
  };

  const viewCommentColumn = {
    label: "Comment",
    layout: (row: IFeedback) => {
      return (
        <Box onClick={() => handleOpenCommentViewDialog(row)}>
          <SvgIcon sx={{ cursor: "pointer" }}>
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
            onChange={(e) => handleChangeStatus(e, row.id)}
          >
            <MenuItem value={EFeedbackStatus.New}>New</MenuItem>
            <MenuItem value={EFeedbackStatus.Follow_Up}>Follow up</MenuItem>
            <MenuItem value={EFeedbackStatus.Postponed}>Postponed</MenuItem>
            <MenuItem value={EFeedbackStatus.No_response}>No response</MenuItem>
            <MenuItem value={EFeedbackStatus.Resolved}>Resolved</MenuItem>
            <MenuItem value={EFeedbackStatus.Not_Resolved}>
              Not resolved
            </MenuItem>
            <MenuItem value={EFeedbackStatus.Misrated}>Misrated</MenuItem>
            <MenuItem value={EFeedbackStatus.Archived}>Archived</MenuItem>
          </Select>
        </Box>
      );
    },
  };

  const methods = useForm({
    defaultValues: { filters: defaultFilterValues },
  });

  const refetchFeedbacks = () => {
    dispatch(GetFeedbacks(methods.watch("filters")));
  };

  const handleChangeSelected = (ids: number[]) => {
    console.log(ids);
  };

  const handleViewFeedback = (id: number) => {
    console.log(id);
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
