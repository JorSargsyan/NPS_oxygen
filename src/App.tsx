import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { CreateRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { toastOptions } from "resources/constants";
import { createContext, useReducer } from "react";
import { appContextInitialState, AppReducer } from "shared/helpers/AppContext";

export const GlobalContext = createContext(null);

function App() {
  const [contextInitialState, dispatchContext] = useReducer(
    AppReducer,
    appContextInitialState
  );
  const router = CreateRoutes();
  const theme = createTheme();

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <GlobalContext.Provider
            value={{ contextInitialState, dispatchContext }}
          >
            <CssBaseline />
            <Toaster position="top-center" toastOptions={toastOptions} />
            <RouterProvider router={router} />
          </GlobalContext.Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
