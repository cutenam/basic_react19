import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 프로젝트 다국어지원 컴포넌트
 *
 * A React component that provides a language switching interface for users.
 * Allows users to change the current application language from a predefined set of languages,
 * with visual indicators for the currently selected language.
 *
 */
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const languages = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ];
  
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    }}>
      <span style={{ fontSize: '14px', color: '#666', marginRight: '5px' }}>
        🌍 {t('common.language')}:
      </span>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: currentLang === lang.code ? '2px solid #667eea' : '2px solid #ddd',
            background: currentLang === lang.code ? '#667eea' : 'white',
            color: currentLang === lang.code ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: currentLang === lang.code ? 'bold' : 'normal',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          onMouseEnter={(e) => {
            if (currentLang !== lang.code) {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentLang !== lang.code) {
              e.currentTarget.style.borderColor = '#ddd';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
