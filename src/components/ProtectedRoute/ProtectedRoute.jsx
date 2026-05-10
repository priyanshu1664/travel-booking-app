import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token } = useSelector((s) => s.user);

  if (!token) {
    return <Navigate to={"/auth"}></Navigate>;
  }

  return children;
}

export default ProtectedRoute;
