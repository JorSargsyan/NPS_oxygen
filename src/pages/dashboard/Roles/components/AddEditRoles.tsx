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
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicSelect from "shared/ui/Select";
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

interface IFormData {}

const AddEditRoles = ({
  onSuccess,
  editData,
}: {
  onSuccess: () => void;
  editData?: IRole;
}) => {
  const permGroups = useSelector(selectPermissionGroups);
  const userGroups = useSelector(selectUserGroups);
  const methods = useForm<IFormData>({
    defaultValues: {},
  });
  const isLoading = useSelector(selectLoadingState);

  const onSubmit = async (data: IFormData) => {
    console.log(data);
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
                <BasicSelect<IUserGroup>
                  label="User Groups"
                  name="userGroup"
                  options={userGroups}
                  valueProp={"id"}
                  labelProp={"name"}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Accessible data
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="accessible"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="General"
                  />
                  <FormControlLabel
                    value="employees"
                    control={<Radio />}
                    label="Subordinate employees"
                  />
                  <FormControlLabel
                    value="personal"
                    control={<Radio />}
                    label="Personal"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid mt={0} container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  name="customerPermission"
                  options={permGroups[0]?.permissions}
                  inputLabel={"Customer Permissions"}
                  multiple
                  defaultValue={[]}
                  optionLabel="name"
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Feedbacks Permissions"
                  name="feedbackPermission"
                  options={permGroups[1].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Dashboard Permissions"
                  name="dashboardPermission"
                  options={permGroups[2].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Campaign Permissions"
                  name="campaignPermission"
                  options={permGroups[3].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Roles Permissions"
                  name="rolePermission"
                  options={permGroups[4].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Users Permissions"
                  name="userPermission"
                  options={permGroups[5].permissions}
                  defaultValue={[]}
                  optionLabel="name"
                  multiple
                />
              </Grid>
              <Grid item xs={6}>
                <BasicAutocomplete<IPermGroupPermission>
                  inputLabel="Translation Permissions"
                  name="translationPermission"
                  options={permGroups[6].permissions}
                  defaultValue={[]}
                  optionLabel="name"
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
