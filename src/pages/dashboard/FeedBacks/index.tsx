import CommentIcon from "@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon";
import {
  Button,
  MenuItem,
  Select,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  IFeedback,
  IFeedbackCauseAndMood,
  IScore,
} from "store/interfaces/feedback";
import { setTableLoading } from "store/slicers/common";
import {
  ExportFeedbacks,
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
  defaultQuickFilterValues,
  EFeedbackFilterTypes,
  EFeedbackUserTypeId,
  EQuickFilterTypes,
  EQuickFilterUserVisibilityValues,
  ESurveyType,
  feedbackFilterTypesKeys,
  feedbackStatusList,
  viewCommentsDialogConfig,
} from "./constants";
import { changeFeedbackStatus } from "./helpers";
import ExportIcon from "@heroicons/react/24/solid/CircleStackIcon";
import AssignIcon from "@heroicons/react/24/solid/UsersIcon";
import ViewIcon from "@heroicons/react/24/solid/EyeIcon";
import { EBaseUrl } from "store/config/constants";
import { ERequestStatus } from "store/enums/index.enum";
import usePermission from "shared/helpers/hooks/usePermission";
import { EFeedbackPermissions } from "resources/permissions/permissions.enum";
import { EScoreTypes } from "store/enums/feedbacks.enum";
import AdvancedFilterIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import { CES_COLORS, CSAT_COLORS, NPS_COLORS } from "../Home/constants";
import { Link } from "react-router-dom";
import video1 from "assets/videos/video1.mp4";

export interface IActiveRow {
  type?: number;
  data?: IFeedbackCauseAndMood;
  rowId?: number;
  state?: number;
  hasAssignedUser?: boolean;
}

const defaultUserVisibility = {
  feedbackUserTypeId: EFeedbackUserTypeId.GENERAL,
  key: EQuickFilterTypes.User_Visibility,
  queryCondition: 2,
  value: EQuickFilterUserVisibilityValues.GENERAL,
};

const defaultFeedbackFilter = {
  feedbackTypeId: 1,
  queryCondition: 2,
};

const Feedbacks = () => {
  const [activeRow, setActiveRow] = useState<IActiveRow>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCommentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  const [selectedFeedbackIDs, setSelectedFeedbackIDs] = useState([]);
  const [isAssignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const dispatch = useAsyncDispatch();
  const feedbacks = useSelector(selectFeedbacks);

  const hasGridCampaignColumnPermission = usePermission(
    EFeedbackPermissions.Grid_view_column_campaign
  );
  const hasGridColumnCustomerAssignPermission = usePermission(
    EFeedbackPermissions.Grid_view_column_customer_assign
  );
  const hasGridColumnScorePermission = usePermission(
    EFeedbackPermissions.Grid_view_column_score
  );
  const hasGridColumnDatePermission = usePermission(
    EFeedbackPermissions.Grid_view_column_date
  );
  const hasGridColumnStatusPermission = usePermission(
    EFeedbackPermissions.Grid_view_column_status
  );
  const hasGridViewFeedbackCardPermission = usePermission(
    EFeedbackPermissions.View_feedback_card
  );
  const hasEditFeedbackStatusPermission = usePermission(
    EFeedbackPermissions.Edit_feedback_status
  );
  const hasQuickFilterByUserVisibilityPermission = usePermission(
    EFeedbackPermissions.Quick_filter_by_user_visibility
  );
  const hasExportPermission = usePermission(EFeedbackPermissions.Export);
  const hasAssignPermission = usePermission(EFeedbackPermissions.Assign);
  const hasSearchPermission = usePermission(EFeedbackPermissions.Search);

  const methods = useForm({
    defaultValues: {
      config: {
        ...defaultFilterValues,
        filters: [defaultFilterRowValue],
        quickFilters: defaultQuickFilterValues,
      },
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "config.filters",
    control: methods.control,
  });

  const handleOpenCommentViewDialog = (row: IFeedback) => {
    setSelectedFeedbackId({ id: row.id, data: row.comments });
    setCommentDialogOpen(true);
  };

  const refetchFeedbacks = useCallback(async () => {
    await dispatch(setTableLoading(true));

    const filtersCombined = methods
      .watch("config.filters")
      .map((filter, index) => {
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
        if (filter.type?.type === EFeedbackFilterTypes.TASK_STATUS) {
          return {
            ...data,
            value: filter?.value,
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
    const hasOtherFilters = otherFilters.filter((i) => !!i.type);
    const formData = {
      ...methods.watch("config"),
      filters: hasOtherFilters,
      scoreFilter: scoreFilters,
    };
    delete formData["quickFilters"];
    await dispatch(GetFeedbacks(formData));
    setFiltersOpen(false);
    await dispatch(setTableLoading(false));
  }, [dispatch, methods]);

  const feedbackColumns = useMemo(() => {
    return [
      { label: "ID", field: "id" },
      ...(hasGridCampaignColumnPermission
        ? [{ label: "Campaign", field: "campaignName" }]
        : []),
      ...(hasGridColumnCustomerAssignPermission
        ? [
            { label: "Customer", field: "customerName" },
            { label: "CX agent", field: "assignedTo" },
          ]
        : []),
      ...(hasGridColumnScorePermission
        ? [
            {
              label: "Score",
              layout: (row: IFeedback) => {
                const bgColor = (score: IScore) => {
                  const val = Number(score?.value);
                  if (
                    score?.type === ESurveyType.NPS ||
                    score?.type === ESurveyType.Friendliness
                  ) {
                    return NPS_COLORS[val];
                  } else if (score?.type === ESurveyType.CustomerEffortScore) {
                    return CES_COLORS[val];
                  } else if (
                    score?.type === ESurveyType.CustomerSatisfactionScore
                  ) {
                    return CSAT_COLORS[val];
                  }
                };

                return (
                  <Box sx={{ display: "flex", gap: "12px" }}>
                    {row?.score.map((score: IScore, index) => {
                      return (
                        <Box
                          bgcolor={bgColor(score)}
                          color="white"
                          key={index}
                          textAlign="center"
                          padding="7px"
                          width="55px"
                          borderRadius="8px"
                          fontSize="12px"
                        >
                          <Box>{EScoreTypes[score?.type]}</Box>
                          <Box>{score?.value}</Box>
                        </Box>
                      );
                    })}
                  </Box>
                );
              },
            },
          ]
        : []),
      ...(hasGridColumnDatePermission
        ? [{ label: "Submission Date", field: "creationDate" }]
        : []),
      ...(hasGridColumnStatusPermission
        ? [
            {
              label: "Status",
              layout: (row: IFeedback) => {
                return (
                  <Box>
                    <Select
                      disabled={!hasEditFeedbackStatusPermission}
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
                          <MenuItem
                            key={index}
                            value={feedbackStatus.value}
                            sx={{ fontSize: 14 }}
                          >
                            {feedbackStatus.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                );
              },
            },
          ]
        : []),
      ...(hasGridViewFeedbackCardPermission
        ? [
            {
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
            },
          ]
        : []),
      ...(hasGridViewFeedbackCardPermission
        ? [
            {
              label: "Details",
              layout: (row: IFeedback) => {
                return (
                  <Box
                    onClick={() => handleViewFeedback(row.id)}
                    textAlign="center"
                  >
                    <SvgIcon sx={{ cursor: "pointer", color: "primary.main" }}>
                      <ViewIcon />
                    </SvgIcon>
                  </Box>
                );
              },
            },
          ]
        : []),
      {
        label: "Video/Voice",
        layout: () => {
          return (
            <Link target="_blank" to={video1}>
              View
            </Link>
          );
        },
      },
    ];
  }, [
    hasGridCampaignColumnPermission,
    hasGridColumnCustomerAssignPermission,
    hasGridColumnScorePermission,
    hasGridColumnDatePermission,
    hasGridColumnStatusPermission,
    hasGridViewFeedbackCardPermission,
    dispatch,
    refetchFeedbacks,
    hasEditFeedbackStatusPermission,
  ]);

  const handleSubmit = useCallback(async () => {
    const quickFiltersWatch = methods.watch("config.quickFilters");

    const filterStatusList = quickFiltersWatch?.status?.map((status, index) => {
      return {
        conditionalStatusId: index + 1,
        key: feedbackFilterTypesKeys.GRID_TASK_STATUS,
        queryCondition: 2,
        value: status.value,
      };
    });

    const quickFiltersData = [
      ...(quickFiltersWatch?.range?.every((i) => !!i)
        ? [
            {
              dateId: 1,
              key: feedbackFilterTypesKeys.DATE,
              queryCondition: 4,
              value: quickFiltersWatch.range[0].format("MM/DD/YYYY"),
            },
            {
              dateId: 1,
              key: feedbackFilterTypesKeys.DATE,
              queryCondition: 5,
              value: quickFiltersWatch.range[1].format("MM/DD/YYYY"),
            },
          ]
        : []),
      ...(quickFiltersWatch?.campaign?.id
        ? [
            {
              campaignId: quickFiltersWatch?.campaign?.id,
              key: feedbackFilterTypesKeys.CAMPAIGN_NAME,
              queryCondition: 2,
              value: quickFiltersWatch?.campaign?.value,
            },
          ]
        : []),
      ...(filterStatusList ? filterStatusList : []),
      ...(quickFiltersWatch.userVisibility ===
      EQuickFilterUserVisibilityValues.GENERAL
        ? [defaultUserVisibility]
        : [
            {
              ...defaultUserVisibility,
              feedbackUserTypeId: EFeedbackUserTypeId.PERSONAL,
              value: EQuickFilterUserVisibilityValues.PERSONAL,
            },
          ]),
      ...(quickFiltersWatch.feedbackType &&
      quickFiltersWatch.feedbackType === feedbackFilterTypesKeys.NPS_AGENT
        ? [
            {
              ...defaultFeedbackFilter,
              key: feedbackFilterTypesKeys.NPS_AGENT,
              value: feedbackFilterTypesKeys.NPS_AGENT,
            },
          ]
        : quickFiltersWatch.feedbackType === feedbackFilterTypesKeys.REDIRECTED
        ? [
            {
              ...defaultFeedbackFilter,
              key: feedbackFilterTypesKeys.REDIRECTED,
              value: feedbackFilterTypesKeys.REDIRECTED,
            },
          ]
        : quickFiltersWatch.feedbackType === feedbackFilterTypesKeys.COMMENTED
        ? [
            {
              ...defaultFeedbackFilter,
              key: feedbackFilterTypesKeys.COMMENTED,
              value: feedbackFilterTypesKeys.COMMENTED,
            },
          ]
        : []),
    ];
    const filters = [...methods.watch("config.filters"), ...quickFiltersData];

    const filteredAdditionalFilters = filters.filter(
      (i: any) => i.type !== null
    );
    const data = {
      ...methods.watch("config"),
      filters: filteredAdditionalFilters,
    };
    delete data.quickFilters;

    await dispatch(GetFeedbacks(data));
  }, [dispatch, methods]);

  const handleChangeSelected = (ids: number[]) => {
    setSelectedFeedbackIDs(ids);
  };

  const handleViewFeedback = (id: number) => {
    const url = `${window.location.origin}/admin/response/${id}`;
    window.open(url, "_blank");
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

  const openAssignFeedbackDrawer = () => {
    const selectedFeedbackList = feedbacks.displayData.filter((feedback) =>
      selectedFeedbackIDs.includes(feedback.id)
    );
    const hasAssignedUser = selectedFeedbackList.find(
      (feedback) => !!feedback.assignedTo.trim()
    );
    setActiveRow({ hasAssignedUser: !!hasAssignedUser });
    setAssignDrawerOpen(true);
  };

  const assignFeedbackSubmitCb = async () => {
    await refetchFeedbacks();
    setActiveRow(undefined);
    setAssignDrawerOpen(false);
  };

  const onExportFeedbacks = useCallback(async () => {
    const dateQuickFiltersWatch = methods.watch("config.quickFilters.range");
    const dateFilters = [
      {
        dateId: 1,
        key: feedbackFilterTypesKeys.DATE,
        queryCondition: 4,
        value: dateQuickFiltersWatch?.[0].format("MM/DD/YYYY"),
      },
      {
        dateId: 1,
        key: feedbackFilterTypesKeys.DATE,
        queryCondition: 5,
        value: dateQuickFiltersWatch?.[1].format("MM/DD/YYYY"),
      },
    ];

    const formData = {
      conditionMatch: 1,
      filters: dateFilters,
      scoreFilter: [],
    };
    const { meta, payload } = await dispatch(ExportFeedbacks(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    const fileUrl = EBaseUrl.BaseURL + payload;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  }, [dispatch, methods]);

  const tableCustomActions = useCallback(() => {
    return (
      <Box display="flex" gap={3} justifyContent="flex-end">
        {hasAssignPermission && (
          <Button
            variant="contained"
            onClick={openAssignFeedbackDrawer}
            startIcon={<AssignIcon height={24} width={24} />}
            disabled={!selectedFeedbackIDs?.length}
          >
            <Typography>Assign</Typography>
          </Button>
        )}

        {hasExportPermission && (
          <Button
            variant="contained"
            onClick={onExportFeedbacks}
            startIcon={<ExportIcon height={24} width={24} />}
            disabled={
              !methods.watch("config.quickFilters.range")?.every((i) => !!i)
            }
          >
            <Typography>Export</Typography>
          </Button>
        )}
      </Box>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFeedbackIDs, methods, onExportFeedbacks]);

  const init = useCallback(async () => {
    await dispatch(setTableLoading(true));
    await dispatch(
      GetFeedbacks({
        ...defaultFilterValues,
        filters: [
          ...(hasQuickFilterByUserVisibilityPermission
            ? [defaultUserVisibility]
            : []),
        ],
      })
    );
    await dispatch(GetFeedbackCauseAndMoodCategoriesList());
    // await dispatch(GetUserManagers());
    await dispatch(setTableLoading(false));
  }, [dispatch, hasQuickFilterByUserVisibilityPermission]);

  const FiltersWrapper = useCallback(
    () => <QuickFilters handleSubmit={handleSubmit} methods={methods} />,
    [handleSubmit, methods]
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent={"space-between"}>
        <Typography variant="h4" fontWeight={500} color="text.secondary">
          Responses
        </Typography>
        <SvgIcon
          onClick={() => setFiltersOpen(true)}
          sx={{ cursor: "pointer" }}
        >
          <Tooltip title="Advanced filters">
            <AdvancedFilterIcon />
          </Tooltip>
        </SvgIcon>
      </Box>
      <BasicTable<IFeedback>
        // hasCustomActions
        // CustomActions={tableCustomActions}
        // selectable
        filterOptions={{ watch: methods.watch, reset: methods.reset }}
        Filter={FiltersWrapper}
        columns={feedbackColumns}
        paginatedData={feedbacks}
        onChange={refetchFeedbacks}
        onChangeSelected={handleChangeSelected}
        hasSearchInput={hasSearchPermission}
      />
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title="Edit Response Status"
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
        {isFiltersOpen ? (
          <Filters
            fieldsConfig={{ fields, append, remove }}
            onChange={refetchFeedbacks}
            methods={methods}
          />
        ) : null}
      </RightDrawer>
      {isCommentDialogOpen ? (
        <SharedDialog
          open={isCommentDialogOpen}
          setOpen={setCommentDialogOpen}
          textConfig={viewCommentsDialogConfig}
          handleCloseCb={handleCloseCommentDialog}
          hasActions={false}
        >
          <ViewComments editData={selectedFeedbackId} />
        </SharedDialog>
      ) : null}
      {/* <RightDrawer
        open={isAssignDrawerOpen}
        setOpen={setAssignDrawerOpen}
        onClose={handleClose}
        title="Assign Feedback"
      >
        <AssignFeedbackDrawer
          hasAssignedUser={activeRow?.hasAssignedUser}
          selectedIDs={selectedFeedbackIDs}
          onSubmitCb={assignFeedbackSubmitCb}
        />
      </RightDrawer> */}
    </Box>
  );
};

export default Feedbacks;
