
import { Navbar, Nav, Button, ButtonGroup, TabContainer } from 'react-bootstrap';
import { FaGlobe, FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import light_messages from '../../assets/light_messages.png';
import './TopNavbar.css';


function TopNavbar() {
    return (
        <Navbar bg="light" expand="sm" className="shadow-sm py-0">
            <TabContainer>

                <Navbar.Brand href="/" className="fw-bold py-0">
                    <img src={light_messages} alt="Light Messages" height="32" width="auto" className="ms-1 me-1" />
                    Light Messages
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-center">
                        <Nav.Link href="/" className="mx-2">
                            <FaHome className="me-1" /> Home
                        </Nav.Link>
                        <Nav.Link href="/register" className="mx-2">
                            <FaUserPlus className="me-1" /> Register
                        </Nav.Link>
                        <Nav.Link href="/login" className="mx-2">
                            <FaSignInAlt className="me-1" /> Login
                        </Nav.Link>
                        <ButtonGroup size="sm" className="ms-3 language-box align-items-center">
                            <FaGlobe className='me-2' size={18}></FaGlobe>
                            <Button variant="outline-secondary">EN</Button>
                            <Button variant="outline-secondary">عربي</Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>

            </TabContainer>
        </Navbar>
    )
}

export default TopNavbar;