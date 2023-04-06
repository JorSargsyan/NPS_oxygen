import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LStorage } from "store/config/constants";

import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { emailRegex, requiredRules } from "shared/helpers/validators";
import Checkbox from "shared/ui/Checkbox";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { Authorize, setAuth } from "store/slicers/auth";
import { Layout as AuthLayout } from "../../layout/Auth";

interface IFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login = () => {
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
    <AuthLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
            </Stack>

            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <FormProvider {...form}>
                <Stack spacing={3}>
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

                <Alert severity="info" sx={{ mt: 3 }}>
                  <div>powered by Oxygen LLC</div>
                </Alert>
              </FormProvider>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
