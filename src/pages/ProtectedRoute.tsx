import React, { useEffect } from "react";
import { useAppSelector } from "../store/hook";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  //   user login ha cookie ha uska pass and usna site band kiya and user again site pa a rha ha that mean wo login ha, getProfile hm wha pa load kreh ga, but starting ma isAuthenticated false ha tu yeh /login pa navigate hoga so loading lgna preh ga. first getProfile ka controller and thunk banana preh ga.
  const { screenLoading, isAuthenticated } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (!isAuthenticated && !screenLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, screenLoading]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
