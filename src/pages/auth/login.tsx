import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "../../layout/Auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
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
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                />
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
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
