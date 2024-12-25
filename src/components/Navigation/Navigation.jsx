import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkIfLoggedIn, getUserDetails, logout } from "../../services/auth";
import { useEffect, useState } from "react";

/**
 * The Navigation component renders the navigation bar at the top of every
 * page. The navigation bar shows the following options:
 *
 * - A link to the homepage
 * - A link to the teachers page
 * - A link to the students page
 * - A logout button if the user is logged in
 *
 * The navigation bar also renders the `Outlet` component, which is a
 * placeholder for the content of the current page.
 */
function Navigation() {
  const navigate = useNavigate();

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Logs the user out of the application by clearing all data stored in
   * localStorage and redirects them to the login page.
   */
  /******  5f3d6d5a-c8cc-460d-9abf-ebdd356b571e  *******/
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Retrieves the user details from the server based on the user ID stored in
   * localStorage and stores it in the component state.
   */
  /******  58b3b8e0-dc50-4924-bd04-393b06da769e  *******/
  const getUser = async () => {
    try {
      const userID = checkIfLoggedIn();
      const user = await getUserDetails(userID);
      /*
        console.log(user.data[0]);
      */
      setUser(user.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user);
  return (
    <>
      <Navbar expand="lg" className="bg-primary text-white">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-white">
            Scholarship
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-white"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {user && user.role === "admin" && (
                <Nav.Link as={Link} to="/teachers" className="text-white">
                  Teachers
                </Nav.Link>
              )}

              {user && ["admin", "teacher"].includes(user.role) && (
                <Nav.Link as={Link} to="/students" className="text-white">
                  Students
                </Nav.Link>
              )}

              {user && user.role == "admin" && (
                <Nav.Link as={Link} to="/verify" className="text-white">
                  Verify Details
                </Nav.Link>
              )}

              {user && user.role == "student" && (
                <Nav.Link as={Link} to="/profile" className="text-white">
                  Profile
                </Nav.Link>
              )}
              {user && user.role == "admin" && (
                <Nav.Link as={Link} to="/departments" className="text-white">
                  Departments
                </Nav.Link>
              )}
              {user && (
                <Nav.Link
                  as={Link}
                  className="text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigation;
