import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-defence-gray-700 hover:text-defence-blue-600 bg-white border border-defence-gray-200 rounded-lg hover:bg-defence-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-defence-blue-500 focus:ring-offset-2"
        aria-label={t('language.switch')}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage?.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white border border-defence-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
            >
              <div className="py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-defence-blue-50 transition-colors flex items-center justify-between ${
                      language === lang.code
                        ? 'bg-defence-blue-50 text-defence-blue-600 font-medium'
                        : 'text-defence-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{lang.code === 'hi' ? '🇮🇳' : '🇬🇧'}</span>
                      <div>
                        <div className="font-medium">{lang.nativeName}</div>
                        <div className="text-xs text-defence-gray-500">{lang.name}</div>
                      </div>
                    </div>
                    {language === lang.code && (
                      <div className="w-2 h-2 bg-defence-blue-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;