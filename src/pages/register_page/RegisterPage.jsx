import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaImage, FaLock, FaPaperPlane, FaUser } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "../../services/authService";

const RegisterPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profile_image: null
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
        if (!formData.first_name.trim()) newErrors.first_name = t('first_name_required');
        if (!formData.last_name.trim()) newErrors.last_name = t('last_name_required');
        if (!formData.email.trim()) newErrors.email = t('email_required');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('invalid_email');
        if (!formData.password) newErrors.password = t('password_required');
        if (!formData.confirmPassword) newErrors.confirmPassword = t('confirm_password_required');
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('passwords_dont_match');
        if (!formData.profile_image) newErrors.profile_image = t('profile_image_required');

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
            console.log('Form submitted:', formData);
            const response = await registerUser(formData);
            console.log('Registration response:', response);
        } catch (error) {
            console.error('Registration error:', error);
            // Loop on errors ans set them to state
            const newErrors = {};
            // Loop on key value of data
            for (const key in error.response.data) {
                // Set the key of the error to the value of the error
                newErrors[key] = error.response.data[key];
            }
            setErrors(newErrors);
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
                        <label className="my-1" htmlFor="first_name"><FaUser /> {t('first_name')}</label>
                        <input
                            type="text"
                            name="first_name"
                            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder={t('first_name')}
                            autoComplete="given-name"
                        />
                        {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                    </div>
                    <div className="w-100">
                        <label className="my-1" htmlFor="last_name"><FaUser /> {t('last_name')}</label>
                        <input
                            type="text"
                            name="last_name"
                            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder={t('last_name')}
                            autoComplete="family-name"
                        />
                        {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
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
                        autoComplete="email"
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
                            autoComplete="new-password"
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
                            autoComplete="new-password"
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="profile_image"><FaImage /> {t('profile_image')}</label>
                    <input
                        type="file"
                        name="profile_image"
                        className={`form-control mt-2 ${errors.profile_image ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        accept="image/*"
                        autoComplete="off"
                    />
                    {errors.profile_image && <div className="invalid-feedback">{errors.profile_image}</div>}
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