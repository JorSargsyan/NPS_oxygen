import CommentIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon";
import { Button, MenuItem, Select, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  defaultFilterValues,
  RIGHT_SIDEBAR_WIDTH_EXTENDED,
} from "resources/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import SharedDialog from "shared/ui/Dialog";
import RightDrawer from "shared/ui/Drawer";
import BasicTable from "shared/ui/Table";
import { IAttachedEmployee } from "store/interfaces/directorates";
import { IFeedback, IFeedbackCauseAndMood } from "store/interfaces/feedback";
import { GetUserManagers, setTableLoading } from "store/slicers/common";
import {
  GetFeedbackCauseAndMoodCategoriesList,
  GetFeedbacks,
  selectFeedbacks,
} from "store/slicers/feedback";
import FeedbackStatusDrawer from "./components/FeedbackStatusDrawer";
import Filters from "./components/Filters";
import QuickFilters from "./components/QuickFilters";
import ViewComments from "./components/ViewComments";
import {
  defaultFilterRowValue,
  EFeedbackFilterTypes,
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
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const feedbacks = useSelector(selectFeedbacks);

  const handleOpenCommentViewDialog = (row: IFeedback) => {
    setSelectedFeedbackId({ id: row.id, data: row.comments });
    setCommentDialogOpen(true);
  };
  const methods = useForm({
    defaultValues: {
      config: {
        ...defaultFilterValues,
        filters: [defaultFilterRowValue],
      },
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "config.filters",
    control: methods.control,
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

  const refetchFeedbacks = async () => {
    await dispatch(setTableLoading(true));

    const filtersCombined = methods
      .watch("config.filters")
      .map((filter, index) => {
        console.log(filter, "filter");
        const data = {
          ...filter,
          rowId: index + 1,
          hidden: null,
          label: filter.type?.label,
          value: filter.value,
          type: filter.type?.type,
          key: filter.type?.key,
        };
        if (filter.type?.type === EFeedbackFilterTypes.NPS_AGENT) {
          return {
            ...data,
            queryCondition: 2,
            value: filter.value,
          };
        }
        if (
          filter.type?.type === EFeedbackFilterTypes.EMPLOYEE ||
          filter.type?.type === EFeedbackFilterTypes.SERVICE_CATEGORY
        ) {
          return {
            ...data,
            value: (filter?.value as IAttachedEmployee)?.value as string,
          };
        }
        if (filter.type?.type === EFeedbackFilterTypes.NPS) {
          return {
            ...data,
            start: filter.type?.range[0],
            end: filter.type?.range[1],
            value: filter.type?.range,
          };
        }
        return data;
      });
    const scoreFilters = filtersCombined.filter(
      (i) => i.type === EFeedbackFilterTypes.NPS
    );
    const otherFilters = filtersCombined.filter(
      (i) => i.type !== EFeedbackFilterTypes.NPS
    );
    await dispatch(
      GetFeedbacks({
        ...methods.watch("config"),
        filters: otherFilters,
        scoreFilter: scoreFilters,
      })
    );
    setFiltersOpen(false);
    await dispatch(setTableLoading(false));
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

  const onFormSuccess = async () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    await refetchFeedbacks();
  };

  const init = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(GetFeedbacks(defaultFilterValues));
    await dispatch(GetFeedbackCauseAndMoodCategoriesList());
    await dispatch(GetUserManagers());
    await dispatch(setTableLoading(false));
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h3">Feedbacks</Typography>
        <Button variant="outlined" onClick={() => setFiltersOpen(true)}>
          Advanced filters
        </Button>
      </Box>
      <BasicTable<IFeedback>
        selectable
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        Filter={() => (
          <QuickFilters onChange={refetchFeedbacks} methods={methods} />
        )}
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
      <RightDrawer
        width={RIGHT_SIDEBAR_WIDTH_EXTENDED}
        open={isFiltersOpen}
        setOpen={setFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        title={`Advanced filters`}
      >
        <Filters
          fieldsConfig={{ fields, append, remove }}
          onChange={refetchFeedbacks}
          methods={methods}
        />
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
