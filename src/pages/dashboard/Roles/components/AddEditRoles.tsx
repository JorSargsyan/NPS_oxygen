import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import {
  selectLoadingState,
  selectPermissionGroups,
} from "store/slicers/common";
import { IRole } from "store/interfaces/roles";
import { selectUserGroups } from "store/slicers/users";
import { IUserGroup } from "store/interfaces/users";
import { IPermGroupPermission } from "store/interfaces/common";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { CreateRole } from "store/slicers/roles";
import { ERequestStatus } from "store/enums/index.enum";

interface IFormData {
  name: string;
  groupIds: number[];
  dataVisibility: string;
  displayName: string;
  permissions: {
    [key: string]: IPermGroupPermission[];
  };
}

const AddEditRoles = ({
  onSuccess,
  editData,
}: {
  onSuccess: () => void;
  editData?: IRole;
}) => {
  const permGroups = useSelector(selectPermissionGroups);
  const userGroups = useSelector(selectUserGroups);
  const dispatch = useAsyncDispatch();
  const methods = useForm<IFormData>();
  const isLoading = useSelector(selectLoadingState);

  const onSubmit = async (data: IFormData) => {
    const { displayName, name, groupIds, permissions, dataVisibility } = data;
    const permissionIds = Object.values(permissions).reduce((acc, curr) => {
      return acc.concat(curr.map((i) => i.id));
    }, [] as number[]);

    const formData = {
      displayName,
      dataVisibility,
      groupIds,
      name,
      permissionIds,
    };

    const { meta } = await dispatch(CreateRole(formData));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }
    onSuccess?.();
  };

  const setEditData = useCallback(() => {
    if (editData) {
    }
  }, [editData]);

  useEffect(() => {
    setEditData();
  }, [setEditData]);

  return (
    <Fragment>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Grid container>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <TextInput<IFormData>
                  label="Role Name"
                  name="name"
                  rules={requiredRules}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput<IFormData>
                  label="Display name"
                  name="displayName"
                  rules={requiredRules}
                />
              </Grid>
              <Grid item xs={4}>
                <BasicAutocomplete<IUserGroup>
                  inputLabel="User Groups"
                  name="groupIds"
                  options={userGroups}
                  multiple
                  defaultValue={[]}
                  optionLabel="name"
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Accessible data</FormLabel>
                <Controller
                  control={methods.control}
                  name="dataVisibility"
                  defaultValue={"1"}
                  render={({ field }) => {
                    return (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="General"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Subordinate employees"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Personal"
                        />
                      </RadioGroup>
                    );
                  }}
                />
              </Grid>
            </Grid>
            <Grid mt={0} container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  name="permissions.customer"
                  options={permGroups[0]?.permissions}
                  inputLabel={"Customer Permissions"}
                  multiple
                  defaultValue={[]}
                  prefix="permissions"
                  optionLabel="name"
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Feedbacks Permissions"
                  name="permissions.feedback"
                  options={permGroups[1].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Dashboard Permissions"
                  name="permissions.dashboard"
                  options={permGroups[2].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Campaign Permissions"
                  name="permissions.campaign"
                  options={permGroups[3].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Roles Permissions"
                  name="permissions.role"
                  options={permGroups[4].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Users Permissions"
                  name="permissions.user"
                  options={permGroups[5].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Translation Permissions"
                  name="permissions.translation"
                  options={permGroups[6].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
            </Grid>
          </Grid>
          <Box
            mt={2}
            sx={{ position: "fixed", bottom: 20, right: 20 }}
            display="flex"
            justifyContent={"flex-end"}
          >
            <Box>
              <ButtonLoader
                fullWidth
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={isLoading}
                type="submit"
              >
                <Typography>Save</Typography>
              </ButtonLoader>
            </Box>
          </Box>
        </FormProvider>
      </form>
    </Fragment>
  );
};

export default AddEditRoles;
