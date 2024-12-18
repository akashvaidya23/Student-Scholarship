import { Navigate } from "react-router-dom";

const CheckIfAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("token ", token);

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default CheckIfAuth;
