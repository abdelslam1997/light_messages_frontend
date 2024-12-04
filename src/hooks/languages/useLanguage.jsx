import { useTranslation } from 'react-i18next';

const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const isLanguageActive = (lng) => i18n.language === lng;

  return { changeLanguage, isLanguageActive };
};

export default useLanguage;
