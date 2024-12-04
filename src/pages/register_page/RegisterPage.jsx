import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaImage, FaLock, FaPaperPlane, FaUser } from "react-icons/fa";
import { useState } from "react";

const RegisterPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = t('first_name_required');
        if (!formData.lastName.trim()) newErrors.lastName = t('last_name_required');
        if (!formData.email.trim()) newErrors.email = t('email_required');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('invalid_email');
        if (!formData.password) newErrors.password = t('password_required');
        if (!formData.confirmPassword) newErrors.confirmPassword = t('confirm_password_required');
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('passwords_dont_match');
        if (!formData.profileImage) newErrors.profileImage = t('profile_image_required');

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            // Add your API call here
            console.log('Form submitted:', formData);
        } catch (error) {
            console.error('Registration error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="mt-5 mx-auto col-xl-5 col-lg-6 col-md-6 col-sm-12 card px-3 pt-3 py-4">
            <h3 className="text-center"><FaPaperPlane /> {t('join_us_now')}</h3>
            <form onSubmit={handleSubmit}>
                <div className="d-flex gap-2 mt-3">
                    <div className="w-100">
                        <label className="my-1" htmlFor="firstName"><FaUser /> {t('first_name')}</label>
                        <input
                            type="text"
                            name="firstName"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder={t('first_name')}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="w-100">
                        <label className="my-1" htmlFor="lastName"><FaUser /> {t('last_name')}</label>
                        <input
                            type="text"
                            name="lastName"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder={t('last_name')}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                </div>

                <div className="w-100 mt-3">
                    <label htmlFor="email"><FaEnvelope /> {t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('email')}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="d-flex gap-2 mt-3">
                    <div className="w-100">
                        <label htmlFor="password"><FaLock /> {t('Password')}</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control mt-2 ${errors.password ? 'is-invalid' : ''}`}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={t('password')}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="w-100">
                        <label htmlFor="confirmPassword"><FaLock /> {t('Confirm Password')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control mt-2 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder={t('confirm_password')}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="profileImage"><FaImage /> {t('profile_image')}</label>
                    <input
                        type="file"
                        name="profileImage"
                        className={`form-control mt-2 ${errors.profileImage ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        accept="image/*"
                    />
                    {errors.profileImage && <div className="invalid-feedback">{errors.profileImage}</div>}
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary mt-3" 
                    disabled={isSubmitting}
                >
                    <FaPaperPlane /> {isSubmitting ? t('registering...') : t('register')}
                </button>
            </form>
        </Container>
    );
};

export default RegisterPage;