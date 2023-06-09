import { Grid, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getQueryParams } from "shared/helpers/getQueryParams";
import { requiredRules } from "shared/helpers/validators";
import BasicAutocomplete from "shared/ui/Autocomplete";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { AppDispatch } from "store/index";
import {
  IAttachedEmployee,
  IAttachedEmployeeAdditionalInfo,
} from "store/interfaces/directorates";
import {
  selectButtonLoadingState,
  setButtonLoading,
} from "store/slicers/common";
import {
  AddDirectorate,
  GetAttachedEmployeeFilterList,
  selectAttachedEmployeeFilteredList,
  UpdateDirectorate,
} from "store/slicers/directorates";
import { IActiveRow } from "..";

interface IFormData {
  name: string;
  attachedEmployeesIDs: Array<
    IAttachedEmployeeAdditionalInfo | IAttachedEmployee
  >;
}

const AddEditDirectorate = ({
  onSuccess,
  editData,
}: {
  onSuccess: () => void;
  editData?: IActiveRow;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const methods = useForm<IFormData>({
    defaultValues: {
      name: "",
      attachedEmployeesIDs: [],
    },
  });
  const isLoading = useSelector(selectButtonLoadingState);
  const employeeList = useSelector(selectAttachedEmployeeFilteredList);

  const onSubmit = async (data: IFormData) => {
    dispatch(setButtonLoading(true));
    const attachedEmployeesIDs = data.attachedEmployeesIDs.map(
      (attachedEmployee) => attachedEmployee.id
    );
    const newFormData = {
      ...data,
      attachedEmployeesIDs,
    };
    if (editData) {
      const editedFormData = { ...newFormData, id: editData.id };
      const { meta } = await dispatch(UpdateDirectorate(editedFormData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setButtonLoading(false));
        return;
      }
    } else {
      const { meta } = await dispatch(AddDirectorate(newFormData));

      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        dispatch(setButtonLoading(false));
        return;
      }
    }

    const message = editData
      ? "Directorate Updated Successfully"
      : "Directorate Added Successfully";
    toast.success(message);
    dispatch(setButtonLoading(false));
    onSuccess();
  };

  const fetchEmployeeList = async (value: string) => {
    if (value) {
      const formData = {
        filter: "attachedemployee",
        term: value,
        count: 15,
        ...(editData?.id ? { directorateID: editData.id } : {}),
      };
      const query = getQueryParams(formData);
      await dispatch(GetAttachedEmployeeFilterList(query));
    }
  };

  const initialFetch = useCallback(async () => {
    const formData = {
      filter: "attachedemployee",
      term: "",
      count: 15,
      ...(editData?.id ? { directorateID: editData.id } : {}),
    };
    const query = getQueryParams(formData);
    await dispatch(GetAttachedEmployeeFilterList(query));

    if (editData) {
      methods.reset({
        name: editData.name ?? "",
        attachedEmployeesIDs: editData.attachedEmployeeAdditionalInfo || [],
      });
    }
  }, [editData, methods, dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <Fragment>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextInput<IFormData>
                label="Directorate name"
                name="name"
                rules={{
                  ...requiredRules,
                  maxLength: {
                    value: 300,
                    message: "Max 300 characters",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <BasicAutocomplete<IAttachedEmployee>
                inputLabel="Employees"
                name="attachedEmployeesIDs"
                options={employeeList}
                defaultValue={[]}
                optionLabel="label"
                multiple
                rules={{ ...requiredRules }}
                fetchFn={fetchEmployeeList}
                async
                isOptionEqualToValue={(option, value) => {
                  return option?.id === value?.id;
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonLoader
                fullWidth
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={isLoading}
                type="submit"
              >
                <Typography>Save</Typography>
              </ButtonLoader>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </Fragment>
  );
};

export default AddEditDirectorate;
