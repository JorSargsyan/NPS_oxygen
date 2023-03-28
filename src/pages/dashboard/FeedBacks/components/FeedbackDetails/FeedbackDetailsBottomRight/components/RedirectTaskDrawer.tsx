import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { addDays, format } from "date-fns";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicDatePicker from "shared/ui/Datepicker";
import BasicTextArea from "shared/ui/TextArea";
import { DATE_FORMAT, DATE_FORMAT_OPTIONAL } from "store/config/constants";
import { ERequestStatus } from "store/enums/index.enum";
import {
  IAttachedEmployee,
  IWithAttachedEmployee,
} from "store/interfaces/directorates";
import {
  IAddTask,
  IFeedbackTask,
  IUpdateTask,
} from "store/interfaces/feedback";
import { selectLoadingState, setLoading } from "store/slicers/common";
import { selectFeedbackEmployeeList } from "store/slicers/directorates";
import { AddFeedbackTask, UpdateFeedbackTask } from "store/slicers/feedback";
import WithAttachedEmployeeSelect from "./WithAttachedEmployeesSelect";

type Props = {
  editData: IFeedbackTask;
  onSuccess: () => void;
};

interface IFormData {
  directorateAttachedEmployee: string | number;
  deadline: Date | null;
  description: string;
  directorateID: number | string;
  employeeList: IWithAttachedEmployee[];
}

const formDefaultValues = {
  directorateAttachedEmployee: "",
  deadline: addDays(new Date(), 7),
  description: "",
  employeeList: [],
  directorateID: "",
};

const RedirectTaskDrawer = (props: Props) => {
  const { editData, onSuccess } = props;
  const employeeList = useSelector(selectFeedbackEmployeeList);
  const isLoading = useSelector(selectLoadingState);
  const dispatch = useAsyncDispatch();
  const { id } = useParams();

  const methods = useForm<IFormData>({
    defaultValues: formDefaultValues,
  });

  const employeeListWatch = useWatch({
    name: "employeeList",
    control: methods.control,
  });

  const setDirectorateID = (value: number) => {
    let directorateID = 0;
    employeeList.forEach((e) => {
      const directorate = e.attachedEmployeeAdditionalInfo.find(
        (item) => Number(item.id) === Number(value)
      );
      if (directorate) {
        directorateID = e.id;
      }
    });
    methods.setValue("directorateID", directorateID);
  };

  const onSubmit = async (data: IFormData) => {
    dispatch(setLoading(true));
    const formData: IAddTask = {
      description: data.description,
      directorateID: Number(data.directorateID),
      directorateAttachedEmployee: data.directorateAttachedEmployee.toString(),
      deadline: format(data.deadline, DATE_FORMAT_OPTIONAL),
      feedbackID: id,
    };

    if (editData?.id) {
      const updatedFormData: IUpdateTask = {
        formData,
        taskID: editData.id,
      };
      const { meta } = await dispatch(UpdateFeedbackTask(updatedFormData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setLoading(false));
        return;
      }
    } else {
      const { meta } = await dispatch(AddFeedbackTask(formData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setLoading(false));
        return;
      }
    }
    dispatch(setLoading(false));
    onSuccess?.();
  };

  const initialFetch = useCallback(() => {
    const updatedOption = {
      id: 0,
      isDisabled: true,
      name: editData?.directoratName,
      attachedEmployeeAdditionalInfo: [
        editData?.attachedEmployeeAdditionalInfo,
      ],
    };

    let updatedEmployeeList = [];
    employeeList.forEach((employee) => {
      const isEmployeeExistsInList =
        employee.attachedEmployeeAdditionalInfo.find(
          (item) =>
            Number(item.id) ===
            Number(editData?.attachedEmployeeAdditionalInfo.id)
        );
      if (isEmployeeExistsInList || !editData?.id) {
        updatedEmployeeList = [...employeeList];
      } else {
        updatedEmployeeList = [updatedOption, ...employeeList];
      }
    });

    if (editData?.id) {
      methods.reset({
        directorateAttachedEmployee:
          editData?.attachedEmployeeAdditionalInfo.id,
        deadline: new Date(format(new Date(editData?.deadline), DATE_FORMAT)),
        description: editData?.description,
        employeeList: updatedEmployeeList,
      });
    } else {
      methods.reset({
        ...formDefaultValues,
        employeeList: employeeList,
      });
    }
  }, [methods, editData, employeeList]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <FormProvider {...methods}>
      <Box mb={2}>
        <Typography sx={{ fontSize: 13, marginBottom: 1 }}>
          Redirect to
        </Typography>
        <WithAttachedEmployeeSelect<IWithAttachedEmployee, IAttachedEmployee>
          name="directorateAttachedEmployee"
          defaultValue={""}
          size="small"
          label="Employees"
          valueProp="id"
          labelProp="label"
          groupNameProp="name"
          groupedListProp="attachedEmployeeAdditionalInfo"
          options={employeeListWatch || []}
          onChangeCB={setDirectorateID}
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          isDisabledProp="isDisabled"
        />
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: 13, marginBottom: 1, color: "warning.main" }}
        >
          Deadline
        </Typography>
        <BasicDatePicker
          rules={{
            required: {
              value: true,
              message: "Required",
            },
          }}
          name="deadline"
          label="Date"
          sx={{ width: "60%" }}
        />
      </Box>
      <Box mt={2} mb={4}>
        <Typography sx={{ fontSize: 13, marginBottom: 1 }}>
          Description
        </Typography>
        <BasicTextArea
          name="description"
          aria-label="Add description"
          placeholder="Type your description here..."
        />
      </Box>
      <ButtonLoader
        fullWidth
        onClick={methods.handleSubmit(onSubmit)}
        isLoading={isLoading}
        type="submit"
      >
        <Typography>{"Save"}</Typography>
      </ButtonLoader>
    </FormProvider>
  );
};

export default RedirectTaskDrawer;
