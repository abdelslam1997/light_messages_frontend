import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { loginUser } from "../../services/authService";
import { useState } from "react";
import { FaEnvelope, FaJoint, FaLock, FaSign, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { getCurrentUser } from '../../services/userService';

const LoginPage = () => {

    const navigate = useNavigate();

    const { t } = useTranslation();
    const { updateUser } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form submitted:', formData);
        try {
            const response = await loginUser(formData);
            const userData = await getCurrentUser();
            updateUser(userData);
            toast.success(t('login_success'));
            navigate('/');

        } catch (error) {
            toast.error(t('login_failed'));
        }
        finally { 
            // Clear password field only
            setFormData(prev => ({
                ...prev,
                password: ''
            }));
        }

    };


    return (
        <Container className="mt-5 mx-auto col-xl-5 col-lg-6 col-md-6 col-sm-12 card px-3 pt-3 py-4">
            <h1 className="text-center">{t('login_page')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><FaEnvelope /> {t('email')}</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('enter_your_email')} autoComplete="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><FaLock /> {t('password')}</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder={t('enter_your_password')} autoComplete="current-password" />
                </div>
                {/* Error Section */}
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark"><FaSignInAlt /> {t('login')}</button>
                </div>
            </form>
        </Container>
    );
};

export default LoginPage;