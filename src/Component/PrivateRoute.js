import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
const PrivateRoute = () => {
  const user = useContext(AuthContext);
  return user.user ? <Navigate to="/Home" /> : <Navigate to="/Login" />;
};
export default PrivateRoute;
