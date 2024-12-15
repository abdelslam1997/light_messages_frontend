import { Navbar, Nav, Button, ButtonGroup, TabContainer } from 'react-bootstrap';
import { FaGlobe, FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import light_messages from '../../assets/light_messages.png';
import './TopNavbar.css';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../hooks/languages/useLanguage';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, clearTokens } from '../../services/authService';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';

function TopNavbar() {
    const { t } = useTranslation();
    const { changeLanguage, isLanguageActive } = useLanguage();

    return (
        <Navbar bg="light" expand="sm" className="shadow-sm py-0 top-navbar">
            <TabContainer>

                <Navbar.Brand as={Link} to="/" className="fw-bold py-0">
                    <img src={light_messages} alt="Light Messages" height="32" width="auto" className="ms-1 me-1" />
                    Light Messages
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="align-items-start">
                        {
                            NavLinks()
                        }
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


const NavLinks = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { clearUser, user } = useUser();

    const handleLogout = () => {
        clearTokens();
        clearUser();
        toast.warning(t('logout_success'));
        navigate('/');
    }

    if (isLoggedIn()) {
        return (
            <>
            <Nav.Link as={Link} to="#" className="mx-2 d-flex align-items-center">
                {user?.profile_image ? (
                    <img 
                        src={user.profile_image} 
                        alt={user.first_name}
                        className="rounded-circle mx-1"
                        style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                    />
                ) : (
                    <FaUser className="mx-1" />
                )}
                <span className='hide-on-768'>{user?.first_name} {user?.last_name}</span>
                <span className='only-on-576'>{user?.first_name} {user?.last_name}</span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="mx-2 d-flex align-items-center nav-link-logout">
                <FaSignInAlt size={18} color='crimson' className="mx-1" /> 
                <span className='hide-on-768'>{t('logout')}</span>
                <span className='only-on-576'>{t('logout')}</span>
            </Nav.Link>
            </>
        )
    }
    else {
        return ( 
        <>
            <Nav.Link as={Link} to="/" className="mx-2">
                <FaHome className="me-1" /> {t('home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="mx-2">
                <FaUserPlus className="me-1" /> {t('register')}
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="mx-2">
                <FaSignOutAlt className="me-1" /> {t('login')}
            </Nav.Link>
        </>
        );
    }
}

export default TopNavbar;