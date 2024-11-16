import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";

function Navigation() {
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navigation;
