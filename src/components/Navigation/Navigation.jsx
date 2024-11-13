import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <Navbar expand="lg" className="bg-primary text-white">
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white">Scholarship</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 text-white" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link href="#action1" className="text-white">Home</Nav.Link>
                            <Nav.Link href="#action2" className="text-white">Link</Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link as={Link} to="login" className="text-white">
                            Login
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
