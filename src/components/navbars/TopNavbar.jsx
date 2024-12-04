
import { Navbar, Nav, Button, ButtonGroup, TabContainer } from 'react-bootstrap';
import { FaGlobe, FaHome, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import light_messages from '../../assets/light_messages.png';
import './TopNavbar.css';
import { useTranslation } from 'react-i18next';

function TopNavbar() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        // change the direction of the page
        document.documentElement.dir = (lng === 'ar') ? 'rtl' : 'ltr';
    };

    const isLanguageActive = (lng) => {
        return i18n.language === lng ? 'active' : '';
    }

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
                            <FaHome className="me-1" /> {t('home')}
                        </Nav.Link>
                        <Nav.Link href="/register" className="mx-2">
                            <FaUserPlus className="me-1" /> {t('register')}
                        </Nav.Link>
                        <Nav.Link href="/login" className="mx-2">
                            <FaSignInAlt className="me-1" /> {t('login')}
                        </Nav.Link>
                        <ButtonGroup size="sm" className="mx-3 language-box align-items-center">
                            <FaGlobe className='mx-2' size={18}></FaGlobe>
                            <Button variant="outline-secondary" onClick={ () => changeLanguage('en') }
                                className={isLanguageActive('en') ? 'active' : ''}>EN</Button>
                            <Button variant="outline-secondary" onClick={ () => changeLanguage('ar') }
                                className={isLanguageActive('ar') ? 'active' : ''}>عربي</Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>

            </TabContainer>
        </Navbar>
    )
}

export default TopNavbar;