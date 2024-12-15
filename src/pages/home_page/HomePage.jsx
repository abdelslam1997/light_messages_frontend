import { useTranslation } from 'react-i18next';
import light_messages from '../../assets/light_messages.png';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <div className="d-flex w-100 justify-content-center align-items-center text-center mt-5 mb-3">
                <img src={light_messages} width={100} alt="Light Messages" />
                <h1 className='fw-bold'>Light Messages</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
                <Link to="/register" className="btn btn-dark btn-lg px-5">
                    <FaUserPlus className="me-2" />
                    {t('register')}
                </Link>
                <Link to="/login" className="btn btn-outline-dark btn-lg px-4 px-4">
                    <FaSignInAlt className="me-2" />
                    {t('login')}
                </Link>
            </div>
        </>
    )
}

export default HomePage;