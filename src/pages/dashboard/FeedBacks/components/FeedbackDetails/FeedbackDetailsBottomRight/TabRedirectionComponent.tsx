import History from "@heroicons/react/24/outline/ClockIcon";
import Edit from "@heroicons/react/24/outline/PencilIcon";
import Trash from "@heroicons/react/24/outline/TrashIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Button,
  Card,
  CardActions,
  Divider,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import SharedDialog from "shared/ui/Dialog";
import RightDrawer from "shared/ui/Drawer";
import BasicSelect from "shared/ui/Select";
import { ERequestStatus } from "store/enums/index.enum";
import {
  IAttachedEmployee,
  IWithAttachedEmployee,
} from "store/interfaces/directorates";
import {
  IFeedbackTask,
  IFeedbackTaskUpdateAssignUser,
  IFeedbackTaskUpdateStatus,
} from "store/interfaces/feedback";
import { setLoading } from "store/slicers/common";
import { GetFeedbackRedirectEmployeeList } from "store/slicers/directorates";
import {
  DeleteFeedbackTask,
  GetFeedbackTaskLogs,
  GetFeedbackTasks,
  UpdateFeedbackTaskAssignedUser,
  UpdateFeedbackTaskStatus,
} from "store/slicers/feedback";
import { selectUserInfo } from "store/slicers/users";
import NoData from "../../NoData";
import FeedbackTaskHistory from "./components/FeedbackTaskHistory";
import RedirectTaskDrawer from "./components/RedirectTaskDrawer";
import WithAttachedEmployeeSelect from "./components/WithAttachedEmployeesSelect";
import {
  deleteFeedbackTaskWarningConfig,
  ERedirectTabStatuses,
  IRedirectTabStatuses,
  redirectTabStatuses,
} from "./constants";
import { CardContentNoPadding } from "./TabNotesComponent";

interface IFormData {
  tasks: IFeedbackTask[];
  employeeList: IWithAttachedEmployee[][];
}

const TabRedirectionComponent = () => {
  const [activeRow, setActiveRow] = useState<IFeedbackTask>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [isLogsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const { id } = useParams();
  const userInfo = useSelector(selectUserInfo);

  const methods = useForm<IFormData>();

  const tasksListWatch = useWatch({
    name: "tasks",
    control: methods.control,
  });

  const employeeListWatch = useWatch({
    name: "employeeList",
    control: methods.control,
  });

  const dispatch = useAsyncDispatch();

  const handleClose = () => {
    setActiveRow(undefined);
  };

  const onFormSuccess = () => {
    setActiveRow(undefined);
    setDrawerOpen(false);
    initialFetch();
  };

  const openTaskDrawer = () => {
    setDrawerOpen(true);
  };

  const editFeedbackTask = (task: IFeedbackTask) => {
    setActiveRow(task);
    setDrawerOpen(true);
  };

  const deleteFeedbackTask = (task: IFeedbackTask) => {
    setActiveRow(task);
    setWarningOpen(true);
  };

  const handleDelete = async () => {
    if (!activeRow) {
      return;
    }
    dispatch(setLoading(true));
    const { meta } = await dispatch(
      DeleteFeedbackTask({ taskID: activeRow?.id, feedbackID: id })
    );
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      dispatch(setLoading(false));
      return;
    }
    setActiveRow(undefined);
    await initialFetch();
    dispatch(setLoading(false));
    toast.success("Campaign is deleted");
  };

  const viewFeedbackTaskHistory = async (task: IFeedbackTask) => {
    await dispatch(GetFeedbackTaskLogs(task.id));
    setLogsDrawerOpen(true);
  };

  const changeAttachedEmployee = async (
    value: number,
    task: IFeedbackTask,
    index
  ) => {
    const directorateID = employeeListWatch?.[index as number]?.reduce(
      (acc, employee) => {
        const getDirectorate = employee?.attachedEmployeeAdditionalInfo.find(
          (a) => Number(a.id) === Number(value)
        );
        if (getDirectorate) {
          acc = employee.id;
        }
        return acc;
      },
      0
    );
    const formData: IFeedbackTaskUpdateAssignUser = {
      taskID: task.id,
      formData: {
        directorateAttachedEmployee: value.toString(),
        directorateID,
        feedbackID: id,
      },
    };
    const { meta } = await dispatch(UpdateFeedbackTaskAssignedUser(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await initialFetch();
  };

  const changeFeedbackStatus = async (value: number, task: IFeedbackTask) => {
    const formData: IFeedbackTaskUpdateStatus = {
      taskID: task.id,
      formData: {
        status: value,
        feedbackID: id,
      },
    };
    const { meta } = await dispatch(UpdateFeedbackTaskStatus(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    await initialFetch();
  };

  const isSameTaskCreator = useCallback(
    (id) => {
      return id === userInfo?.id;
    },
    [userInfo?.id]
  );

  const initialFetch = useCallback(async () => {
    const res = await Promise.all([
      dispatch(GetFeedbackTasks(id)),
      dispatch(GetFeedbackRedirectEmployeeList(id)),
    ]);
    const tasks = res[0]?.payload;
    const employeeList = res[1]?.payload;
    let employeeListWithAdditionalInfo = [];
    employeeList.forEach((item) => {
      employeeListWithAdditionalInfo.push(
        ...item.attachedEmployeeAdditionalInfo
      );
    });

    const updatedEmployeeList: IWithAttachedEmployee[][] = tasks.map(
      (item: IFeedbackTask) => {
        const updatedOption = {
          id: 0,
          isDisabled: true,
          name: item.directoratName,
          attachedEmployeeAdditionalInfo: [item.attachedEmployeeAdditionalInfo],
        };
        const isEmployeeExistsInList = employeeListWithAdditionalInfo.find(
          (i) =>
            Number(i.id) === Number(item?.attachedEmployeeAdditionalInfo.id)
        );
        if (isEmployeeExistsInList) {
          return employeeList;
        }
        return [updatedOption, ...employeeList];
      }
    );
    methods.reset({
      tasks,
      employeeList: updatedEmployeeList,
    });
  }, [dispatch, id, methods]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Box p={3} sx={{ overflow: "scroll", height: "500px", p: 3 }}>
      <Box textAlign="right" pb={3}>
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="outlined"
          onClick={openTaskDrawer}
        >
          Redirect
        </Button>
      </Box>
      <FormProvider {...methods}>
        {tasksListWatch?.length ? (
          tasksListWatch?.map((task, index) => {
            return (
              <Card key={task.id} sx={{ marginBottom: 2 }}>
                <CardContentNoPadding>
                  {!task.isDeleted ? (
                    <Fragment>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingBottom: 2,
                        }}
                      >
                        <Box display="flex">
                          <Typography fontSize={13} mr={1}>
                            Deadline:
                          </Typography>
                          <Typography fontWeight="bold" fontSize={13}>
                            {task.deadline}
                          </Typography>
                        </Box>

                        <CardActions>
                          {!task.isDeleted &&
                            isSameTaskCreator(task.createdBy.id) &&
                            task.status.id !==
                              ERedirectTabStatuses.Completed && (
                              <Button
                                onClick={(e) => editFeedbackTask(task)}
                                startIcon={<Edit height={15} width={15} />}
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 25,
                                  padding: "10px",
                                  "& .MuiButton-startIcon": {
                                    marginRight: 0,
                                  },
                                }}
                              />
                            )}
                          {!task.isDeleted &&
                            isSameTaskCreator(task.createdBy.id) && (
                              <Button
                                onClick={(e) => deleteFeedbackTask(task)}
                                startIcon={<Trash height={15} width={15} />}
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 25,
                                  padding: "10px",
                                  "& .MuiButton-startIcon": {
                                    marginRight: 0,
                                  },
                                }}
                              />
                            )}

                          {(task.isDeleted || task.isUpdated) && (
                            <Button
                              onClick={() => viewFeedbackTaskHistory(task)}
                              startIcon={<History height={15} width={15} />}
                              size="small"
                              variant="outlined"
                              sx={{
                                minWidth: 25,
                                padding: "10px",
                                "& .MuiButton-startIcon": {
                                  marginRight: 0,
                                },
                              }}
                            />
                          )}
                        </CardActions>
                      </Box>
                      <Box mb={2} sx={{ display: "flex", gap: 2 }}>
                        <WithAttachedEmployeeSelect<
                          IWithAttachedEmployee,
                          IAttachedEmployee
                        >
                          name={`tasks[${index}].attachedEmployeeAdditionalInfo.id`}
                          defaultValue={""}
                          size="small"
                          label="Employees"
                          valueProp="id"
                          labelProp="label"
                          groupNameProp="name"
                          groupedListProp="attachedEmployeeAdditionalInfo"
                          options={employeeListWatch[index]}
                          isDisabledProp="isDisabled"
                          onChangeCB={(value: number) =>
                            changeAttachedEmployee(value, task, index)
                          }
                        />

                        <BasicSelect<IRedirectTabStatuses>
                          name={`tasks[${index}].status.id`}
                          defaultValue={""}
                          size="small"
                          label="Feedback status"
                          valueProp="value"
                          labelProp="name"
                          options={redirectTabStatuses}
                          onChangeCB={(value: number) =>
                            changeFeedbackStatus(value, task)
                          }
                          disabled={
                            task.status.id === ERedirectTabStatuses.Completed
                          }
                        />
                      </Box>
                      <Fragment>
                        <Typography sx={{ marginBottom: 1, fontSize: 13 }}>
                          Redirected department
                        </Typography>
                        <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
                          {task.directoratName}
                        </Typography>
                      </Fragment>
                      <Divider
                        sx={{ borderColor: "neutral.400", margin: "8px 0" }}
                      />
                      {task.description && (
                        <Fragment>
                          <Fragment>
                            <Typography sx={{ marginBottom: 1, fontSize: 13 }}>
                              Task description
                            </Typography>
                            <Typography
                              sx={{
                                marginBottom: 1,
                                fontWeight: "bold",
                                fontSize: 13,
                              }}
                            >
                              {task.description}
                            </Typography>
                          </Fragment>
                          <Divider
                            sx={{
                              borderColor: "neutral.400",
                              margin: "8px 0",
                            }}
                          />
                        </Fragment>
                      )}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography sx={{ fontSize: 14, color: "info.main" }}>
                          Created by
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {task.createdBy.name.concat(
                            ` ${task.createdBy.surname}`
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {task.creationDate}
                        </Typography>
                      </Box>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography sx={{ fontSize: 14, color: "info.main" }}>
                          Created by
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {task.createdBy.name.concat(
                            ` ${task.createdBy.surname}`
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {task.creationDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography sx={{ fontSize: 14, color: "error.main" }}>
                          Deleted on
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          {task.updatedDate}
                        </Typography>
                      </Box>
                    </Fragment>
                  )}
                </CardContentNoPadding>
              </Card>
            );
          })
        ) : (
          <NoData description="There are no tasks yet" />
        )}
      </FormProvider>
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title={`${activeRow ? "Edit" : "Add"} Task`}
      >
        <RedirectTaskDrawer editData={activeRow} onSuccess={onFormSuccess} />
      </RightDrawer>
      <SharedDialog
        open={warningOpen}
        setOpen={setWarningOpen}
        onSuccess={handleDelete}
        textConfig={deleteFeedbackTaskWarningConfig}
      />
      <RightDrawer
        open={isLogsDrawerOpen}
        setOpen={setLogsDrawerOpen}
        title="View Feedback Task Logs"
      >
        <FeedbackTaskHistory />
      </RightDrawer>
    </Box>
  );
};

export default TabRedirectionComponent;
