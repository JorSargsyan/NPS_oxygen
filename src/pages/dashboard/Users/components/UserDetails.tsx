import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicSelect from "shared/ui/Select";
import { ERequestStatus } from "store/enums/index.enum";
import { IUser, IViewUserRoleItem } from "store/interfaces/users";
import { GetUserById, selectUserViewRolesList } from "store/slicers/users";

interface IFormData {
  roleID: number | string;
}

enum ERoles {
  SuperAdmin = 1,
}

const UserDetails = ({ userId }: { userId: number }) => {
  const dispatch = useAsyncDispatch();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const userRolesList = useSelector(selectUserViewRolesList);

  const methods = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {};

  const isOptionDisabled = useCallback((option) => {
    return option.id === ERoles.SuperAdmin;
  }, []);

  const handleFetchUserDetailedInfo = useCallback(async () => {
    const { meta, payload } = await dispatch(GetUserById(userId));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    setUserInfo(payload);
    methods.reset({
      roleID: payload?.role?.id,
    });
  }, [dispatch, userId, methods]);

  useEffect(() => {
    handleFetchUserDetailedInfo();
  }, [handleFetchUserDetailedInfo]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <CardContent sx={{ pt: 4 }}>
              <Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography fontSize={14}>Full Name</Typography>
                    <Typography fontWeight={"bold"}>
                      {userInfo?.name} {userInfo?.surname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontSize={14}>Email Address</Typography>
                    <Typography fontWeight={"bold"}>
                      {userInfo?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontSize={14}>Role</Typography>
                    <Typography fontWeight={"bold"}>
                      {userInfo?.role.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontSize={14}>Position</Typography>
                    <Typography fontWeight={"bold"}>
                      {userInfo?.position}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontSize={14}> Department</Typography>
                    <Typography fontWeight={"bold"}>
                      {userInfo?.department}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mt={4}>
                <BasicSelect<IViewUserRoleItem>
                  name="roleID"
                  label="Role"
                  valueProp="id"
                  labelProp="label"
                  defaultValue=""
                  isOptionDisabled={isOptionDisabled}
                  options={userRolesList}
                  hasDisabledOption
                />
              </Box>
              <Box mt={4}>
                <ButtonLoader
                  fullWidth
                  onClick={methods.handleSubmit(onSubmit)}
                  isLoading={false}
                  type="submit"
                  disabled={!methods?.formState?.dirtyFields?.roleID}
                >
                  <Typography>{"Save"}</Typography>
                </ButtonLoader>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default UserDetails;
