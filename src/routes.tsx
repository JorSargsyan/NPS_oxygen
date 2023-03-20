import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";

export const createRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return router;
};
