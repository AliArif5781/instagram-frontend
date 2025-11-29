import type { RouteObject } from "react-router";
import Home from "../pages/Home";
import ProtectedRoute from "../pages/ProtectedRoute";
import { authRoutes } from "../modules/auth/routes";
import { profileRoute } from "../modules/profile/routes";
import { messageRoute } from "../modules/messages/routes";

export const routes: RouteObject[] = [
  // ============ PUBLIC ROUTES ============
  ...authRoutes,

  // ============ PROTECTED ROUTES ============
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [...profileRoute, ...messageRoute],
  },
];
