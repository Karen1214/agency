import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      title={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <Languages size={18} className="text-gray-700" />
      <span className="text-sm font-medium text-gray-700 uppercase">
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  );
}
