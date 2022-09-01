import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
const PrivateRoute = () => {
  const user = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/Login" />;
};
export default PrivateRoute;
