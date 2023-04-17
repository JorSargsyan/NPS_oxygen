import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormProvider, useForm } from "react-hook-form";
import BasicSelect from "shared/ui/Select";
import { IUseCase, branchListMock, operatorListMock } from "../constants";
import video4 from "assets/videos/video4.mp4";
import BasicDatePicker from "shared/ui/Datepicker";
import BasicDateTimePicker from "shared/ui/DateTimepicker";
import { format, subHours } from "date-fns";
import { requiredRules } from "shared/helpers/validators";
import toast from "react-hot-toast";

const AddUseCase = ({ onSuccess }: { onSuccess: () => void }) => {
  const methods = useForm({
    defaultValues: {
      operator: "",
      branch: "",
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);
    let id = Math.floor(Math.random() * 1000);
    const branchName = branchListMock.find(
      (i) => i.value === formData.branch
    ).label;
    let response: IUseCase = {
      id,
      caseId: `HJSADJ${id}`,
      creationDate: format(new Date(), "MM/dd/yyyy"),
      createdBy: "Satisfai@admin.am",
      source: branchName,
      video: {
        title: `${branchName}_${id}`,
        url: video4,
      },
      hasChecklist: true,
    };
    let useCaseData = JSON.parse(localStorage.getItem("useCaseData"));
    useCaseData.push(response);
    localStorage.setItem("useCaseData", JSON.stringify(useCaseData));
    toast.success("Use case added successfully");
    onSuccess?.();
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box my={2}>
          <BasicSelect
            label="Branch"
            valueProp="value"
            labelProp="label"
            rules={requiredRules}
            options={branchListMock}
            name={"branch"}
          />
        </Box>
        <Box my={2}>
          <BasicSelect
            label="Operator"
            valueProp="value"
            rules={requiredRules}
            labelProp="label"
            options={operatorListMock}
            name={"operator"}
          />
        </Box>
        <Box my={2}>
          <BasicDatePicker
            rules={{
              required: {
                value: true,
                message: "Required",
              },
            }}
            defaultValue={new Date()}
            name="date"
            label="Date"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
          <Box my={2} flex={1}>
            <BasicDateTimePicker
              sx={{ width: "100%" }}
              name={"timeFrom"}
              rules={{
                required: {
                  value: true,
                  message: "Required",
                },
              }}
              label={"Time from"}
              defaultValue={subHours(new Date(), 1)}
              disablePast={false}
            />
          </Box>
          <Box my={2} flex={1}>
            <BasicDateTimePicker
              defaultValue={new Date()}
              sx={{ width: "100%" }}
              name={"timeTo"}
              rules={{
                required: {
                  value: true,
                  message: "Required",
                },
              }}
              label={"Time to"}
              disablePast={false}
            />
          </Box>
        </Box>

        <Box my={2} flexDirection={"row-reverse"} display={"flex"}>
          <Button onClick={methods.handleSubmit(onSubmit)} variant="contained">
            <Typography>Submit</Typography>
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default AddUseCase;
