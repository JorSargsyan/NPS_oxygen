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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import RightDrawer from "shared/ui/Drawer";
import BasicSelect from "shared/ui/Select";
import {
  IAttachedEmployee,
  IWithAttachedEmployee,
} from "store/interfaces/directorates";
import { IFeedbackTask } from "store/interfaces/feedback";
import { GetFeedbackRedirectEmployeeList } from "store/slicers/directorates";
import { GetFeedbackTasks } from "store/slicers/feedback";
import { selectUserInfo } from "store/slicers/users";
import RedirectTaskDrawer from "./components/RedirectTaskDrawer";
import WithAttachedEmployeeSelect from "./components/WithAttachedEmployeesSelect";
import { IRedirectTabStatuses, redirectTabStatuses } from "./constants";
import { CardContentNoPadding } from "./TabNotesComponent";

interface IFormData {
  tasks: IFeedbackTask[];
  employeeList: IWithAttachedEmployee[];
}

const TabRedirectionComponent = () => {
  const [activeRow, setActiveRow] = useState();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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

  const openTaskDrawer = () => {
    setDrawerOpen(true);
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
    const updatedEmployeeList: IWithAttachedEmployee[] = tasks.map(
      (item: IFeedbackTask) => {
        const updatedOption = {
          id: item.id,
          isDisabled: true,
          name: item.directoratName,
          attachedEmployeeAdditionalInfo: [item.attachedEmployeeAdditionalInfo],
        };
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
        {tasksListWatch?.map((task, index) => {
          return (
            <Card key={task.id} sx={{ marginBottom: 2 }}>
              <CardContentNoPadding>
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
                      isSameTaskCreator(task.createdBy.id) && (
                        <Button
                          // onClick={(e) => editNote(task)}
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
                          // onClick={(e) => deletetask(task)}
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
                        // onClick={() => viewFeedbackHistory(task)}
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
                  />

                  <BasicSelect<IRedirectTabStatuses>
                    name={`tasks[${index}].status.id`}
                    defaultValue={""}
                    size="small"
                    label="Feedback status"
                    valueProp="value"
                    labelProp="name"
                    options={redirectTabStatuses}
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
                <Divider sx={{ borderColor: "neutral.400", margin: "8px 0" }} />
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
                      sx={{ borderColor: "neutral.400", margin: "8px 0" }}
                    />
                  </Fragment>
                )}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography sx={{ fontSize: 14 }}>Created by</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                    {task.createdBy.name.concat(` ${task.createdBy.surname}`)}
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                    {task.creationDate}
                  </Typography>
                </Box>
              </CardContentNoPadding>
            </Card>
          );
        })}
      </FormProvider>
      <RightDrawer
        open={isDrawerOpen}
        setOpen={setDrawerOpen}
        onClose={handleClose}
        title={`${activeRow ? "Edit" : "Add"} Task`}
      >
        {/* {activeRow?.type && ( */}
        <RedirectTaskDrawer
        // editData={activeRow}
        // onSuccess={onFormSuccess}
        />
        {/* )} */}
      </RightDrawer>
    </Box>
  );
};

export default TabRedirectionComponent;
