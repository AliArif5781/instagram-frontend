// components/PublicRoute.tsx
import { useEffect } from "react";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { screenLoading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    // If user is authenticated and not loading, redirect to home/dashboard
    if (isAuthenticated && !screenLoading) {
      navigate("/"); // or "/dashboard", "/home" - wherever you want authenticated users to go
    }
  }, [isAuthenticated, screenLoading, navigate]);

  // Show nothing while checking authentication
  if (screenLoading) {
    return null;
  }

  // Only show children if user is NOT authenticated
  return !isAuthenticated ? children : null;
};

export default PublicRoute;
