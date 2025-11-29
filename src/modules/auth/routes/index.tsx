import type { RouteObject } from "react-router-dom";
import LoginPage from "../pages/Login";
import Signup from "../pages/Signup";
import PublicRoute from "../../../pages/PublicRoute";

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
];
