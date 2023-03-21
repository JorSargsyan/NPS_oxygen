import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { ERequestStatus } from "store/enums/index.enum";
import { IUser } from "store/interfaces/users";
import { GetUserById } from "store/slicers/users";

const UserDetails = ({ userId }: { userId: number }) => {
  const dispatch = useAsyncDispatch();
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  const handleFetchUserDetailedInfo = useCallback(async () => {
    const { meta, payload } = await dispatch(GetUserById(userId));

    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    setUserInfo(payload);
  }, [dispatch, userId]);

  useEffect(() => {
    handleFetchUserDetailedInfo();
  }, [handleFetchUserDetailedInfo]);

  return (
    <Box>
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
                  <Typography fontWeight={"bold"}>{userInfo?.email}</Typography>
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
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default UserDetails;
