import { Navigate } from "react-router-dom";

const CheckIfUnAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return children;
  }
  return <Navigate to="/dashboard" />;
};

export default CheckIfUnAuth;
