import {
  Typography,
  Grid,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  CardHeader,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { EBaseUrl } from "store/config/constants";
import { selectUserInfo } from "store/slicers/users";

const AccountPage = () => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        src={`${EBaseUrl.MediaUserURL}/${userInfo?.imagePath}`}
                        sx={{
                          height: 80,
                          mb: 2,
                          width: 80,
                        }}
                      />
                      <Typography gutterBottom variant="h5">
                        {userInfo?.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {userInfo?.position}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button fullWidth variant="text">
                      Upload picture
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <Card>
                  <CardHeader title="Profile Information" />
                  <CardContent sx={{ pt: 0 }}>
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
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default AccountPage;
