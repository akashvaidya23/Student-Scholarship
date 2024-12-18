import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkIfLoggedIn, logout } from "../../services/auth";

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const user = checkIfLoggedIn();

  return (
    <>
      <Navbar expand="lg" className="bg-primary text-white">
        <Container fluid>
          <Navbar.Brand as={Link} href="/" className="text-white">
            Scholarship
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-white"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} href="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link as={Link} href="/" className="text-white">
                Link
              </Nav.Link>
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
