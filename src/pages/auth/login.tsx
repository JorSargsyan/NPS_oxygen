import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LStorage } from "store/config/constants";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { emailRegex, requiredRules } from "shared/helpers/validators";
import Checkbox from "shared/ui/Checkbox";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { Authorize, setAuth } from "store/slicers/auth";
import Logo from "assets/icons/logo_light_horisontal.png";

interface IFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
  const smDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useAsyncDispatch();
  const form = useForm<IFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: IFormValues) => {
    const { meta, payload } = await dispatch(Authorize(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    localStorage.setItem(LStorage.AUTH, payload.accessToken);
    dispatch(setAuth(true));
    navigate("/admin/overview");
  };

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: `url(${require("assets/images/auth_bg.jpg")})`,
        backgroundSize: "cover",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          p: smDown ? 0 : 2,
          width: { xs: "95%", md: "40%", lg: "35%", xl: "25%" },
        }}
      >
        <CardContent
          sx={{
            p: "20px",
            py: "100px",
            width: "100%",
            paddingTop: 2,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              width: "100%",
              justifyContent: "center",
              height: 70,
              mb: 2,
            }}
          >
            <img src={Logo} alt="" />
          </Box>
          <div>
            <Stack spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h6">Login</Typography>
            </Stack>

            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <FormProvider {...form}>
                <Stack spacing={2}>
                  <TextInput<IFormValues>
                    label="Email Address"
                    name="email"
                    type="email"
                    rules={{
                      pattern: {
                        value: emailRegex,
                        message: "Please enter a valid email address",
                      },
                      ...requiredRules,
                    }}
                  />
                  <TextInput<IFormValues>
                    label="Password"
                    name="password"
                    isSecure
                    rules={requiredRules}
                  />
                  <Checkbox name="isRemember" label="Remember me" />
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </FormProvider>
            </form>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
