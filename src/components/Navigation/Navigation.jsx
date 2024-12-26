import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkIfLoggedIn, getUserDetails, logout } from "../../services/auth";
import { useEffect, useState } from "react";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userID = checkIfLoggedIn();
      console.log("User ID: ", userID);
      if (userID) {
        const user = await getUserDetails(userID);
        console.log("User Details: ", user);
        setUser(user.data[0]);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("user ", user);
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
