import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // adjust path as needed
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-bars loading-md text-center mx-auto mt-10"></span>;
  }

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please log in to access this page.",
    });
    return <Navigate to="/sign-in-sign-up" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
