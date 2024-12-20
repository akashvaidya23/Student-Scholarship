import { Navigate } from "react-router-dom";

/**
 * This component checks if the user is authenticated by looking for a valid
 * authentication token in localStorage. If the user is not authenticated, it
 * redirects the user to the login page. If the user is authenticated, it renders
 * the children components.
 * @param {{ children: React.ReactNode }} props
 * @returns {ReactElement}
 */
const CheckIfAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("token ", token);

  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default CheckIfAuth;
