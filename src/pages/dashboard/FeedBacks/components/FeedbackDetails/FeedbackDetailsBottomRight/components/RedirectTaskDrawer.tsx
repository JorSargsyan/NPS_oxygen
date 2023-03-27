import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import BasicDatePicker from "shared/ui/Datepicker";
import BasicTextArea from "shared/ui/TextArea";
import {
  IAttachedEmployee,
  IWithAttachedEmployee,
} from "store/interfaces/directorates";
import { selectFeedbackEmployeeList } from "store/slicers/directorates";
import WithAttachedEmployeeSelect from "./WithAttachedEmployeesSelect";

type Props = {};

interface IFormData {
  directorateAttachedEmployee: string | number;
  deadline: Date | null;
  description: string;
}

const RedirectTaskDrawer = (props: Props) => {
  const employeeList = useSelector(selectFeedbackEmployeeList);

  const methods = useForm<IFormData>({
    defaultValues: {
      directorateAttachedEmployee: "",
      deadline: new Date(),
      description: "",
    },
  });

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
          options={employeeList}
        />
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: 13, marginBottom: 1, color: "warning.main" }}
        >
          Deadline
        </Typography>
        <BasicDatePicker name="deadline" label="Date" sx={{ width: "60%" }} />
      </Box>
      <Box mt={2}>
        <Typography sx={{ fontSize: 13, marginBottom: 1 }}>
          Description
        </Typography>
        <BasicTextArea
          name="description"
          aria-label="Add description"
          placeholder="Type your description here..."
        />
      </Box>
    </FormProvider>
  );
};

export default RedirectTaskDrawer;
