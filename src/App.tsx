import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

function App(props) {
  const router = createRoutes();
  const theme = createTheme();
  return (
    <div>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
          </ThemeProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
