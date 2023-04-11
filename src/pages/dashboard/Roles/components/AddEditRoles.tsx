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
import { IRoleDetailed } from "store/interfaces/roles";
import { selectUserGroups } from "store/slicers/users";
import { IUserGroup } from "store/interfaces/users";
import { IPermGroupPermission } from "store/interfaces/common";
import BasicAutocomplete from "shared/ui/Autocomplete";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { CreateRole, UpdateRole } from "store/slicers/roles";
import { ERequestStatus } from "store/enums/index.enum";
import toast from "react-hot-toast";

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
  rowId,
}: {
  onSuccess: () => void;
  editData?: IRoleDetailed;
  rowId: number;
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

    if (editData) {
      const { meta } = await dispatch(UpdateRole({ formData, id: rowId }));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      toast.success("Role is Updated");
    } else {
      const { meta } = await dispatch(CreateRole(formData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      toast.success("Role is Created");
    }

    onSuccess?.();
  };

  const setEditData = useCallback(() => {
    if (editData) {
      const permGroupData = {};

      permGroups.forEach((perm) => {
        permGroupData[perm.group.replace("bk_pm_gr_", "")] =
          perm.permissions.filter((i) =>
            editData?.permissionIds.includes(i.id)
          );
      });
      methods.reset({
        ...editData,
        permissions: permGroupData,
      });
    }
  }, [editData, methods, permGroups]);

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
                  hasSelectAllOption
                  options={permGroups?.[0]?.permissions}
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
                  name="permissions.feedbacks"
                  hasSelectAllOption
                  options={permGroups?.[1].permissions}
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
                  hasSelectAllOption
                  options={permGroups?.[2].permissions}
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
                  hasSelectAllOption
                  options={permGroups?.[3].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Roles Permissions"
                  name="permissions.roles"
                  hasSelectAllOption
                  options={permGroups?.[4].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Users Permissions"
                  name="permissions.users"
                  hasSelectAllOption
                  options={permGroups?.[5].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Translation Permissions"
                  name="permissions.translations"
                  hasSelectAllOption
                  options={permGroups?.[6].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  prefix="permissions"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Directorate Permissions"
                  name="permissions.directorate"
                  hasSelectAllOption
                  options={permGroups?.[7]?.permissions || []}
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
                disabled={!Object.keys(methods.formState.touchedFields).length}
                type="submit"
              >
                <Typography>{editData ? "Update" : "Save"}</Typography>
              </ButtonLoader>
            </Box>
          </Box>
        </FormProvider>
      </form>
    </Fragment>
  );
};

export default AddEditRoles;
