import { Alert, Box, Button, Link, Stack, Typography } from "@mui/material";
import { Layout as AuthLayout } from "../../layout/Auth";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { Authorize } from "store/slicers/auth";
import { ERequestStatus } from "store/enums/index.enum";
import TextInput from "shared/ui/TextInput";
import Checkbox from "shared/ui/Checkbox";

const Login = () => {
  const dispatch = useAsyncDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    const { meta, payload } = await dispatch(Authorize(formData));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      return;
    }

    localStorage.setItem("authorized", payload.accessToken);
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
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>

            <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
              <FormProvider {...form}>
                <Stack spacing={3}>
                  <TextInput label="Email Address" name="email" type="email" />
                  <TextInput label="Password" name="password" type="password" />
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
                  <div>
                    You can use <b>demo@nps.io</b> and password <b>123456</b>
                  </div>
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
