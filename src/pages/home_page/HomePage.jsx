import { useTranslation } from 'react-i18next';

function HomePage() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="mt-5 text-center">{t('home_page')}</h1>
        </>
    )
}

export default HomePage;