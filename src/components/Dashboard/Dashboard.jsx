import { checkIfLoggedIn } from "../../services/auth";

/**
 * Dashboard component
 * @returns {JSX.Element} A greeting message for the currently logged in user
 */
const Dashboard = () => {
  const user = checkIfLoggedIn();
  return (
    <>
      <h5>
        Welcome {user.name}. You are a {user.role}
      </h5>
    </>
  );
};

export default Dashboard;
