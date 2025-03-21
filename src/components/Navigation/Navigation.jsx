import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserDetails, logout } from "../../services/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/user/userSlice";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout();
    dispatch(userLogout());
    navigate("/");
  };
  const [user, setUser] = useState();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const getUser = async () => {
    try {
      if (currentUser.user != null) {
        const user = await getUserDetails(currentUser.user);
        setUser(user.data[0]);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
                  Scholarship Officers
                </Nav.Link>
              )}

              {user && ["admin", "scholarship officer"].includes(user.role) && (
                <Nav.Link as={Link} to="/students" className="text-white">
                  Students
                </Nav.Link>
              )}

              {user && user.role === "student" && (
                <Nav.Link as={Link} to="/profile" className="text-white">
                  Profile
                </Nav.Link>
              )}
            </Nav>
            {user && (
              <Nav className="ms-auto">
                <Nav.Link
                  as={Link}
                  className="text-white"
                  style={{ cursor: "default" }}
                  disabled
                >
                  {user.name}
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigation;
