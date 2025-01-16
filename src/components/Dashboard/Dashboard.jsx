import { useEffect, useState } from "react";
import { checkIfLoggedIn, getUserDetails } from "../../services/auth";

/**
 * Dashboard component
 * @returns {JSX.Element} A greeting message for the currently logged in user
 */
const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    document.title = "Dashboard";
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userID = checkIfLoggedIn();
      const user = await getUserDetails(userID);
      setUserDetails(user.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h5>Welcome {userDetails.name}.</h5>
    </>
  );
};

export default Dashboard;
