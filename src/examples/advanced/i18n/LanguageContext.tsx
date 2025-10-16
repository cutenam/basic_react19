import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language, LanguageContextType, Translations } from './types';
import { translations } from './types';

// Context 생성
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Provider 컴포넌트
 * - App 컴포넌트에 설정함
 * - 로컬 스토리지에서 현재 설정된 언어 가져오기
 * - 언어 변경을 위한 메소드 제공
 * - 번역 함수 제공
 *
 * Provides the current language context, translation functionality,
 * and the ability to change the language across the application.
 *
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // 로컬 스토리지에서 저장된 언어 가져오기
  const getInitialLanguage = (): Language => {
    const saved = localStorage.getItem('language-context');
    return (saved === 'ko' || saved === 'en' || saved === 'ja') ? saved : 'ko';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // 언어 변경 시 로컬 스토리지에 저장
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language-context', lang);
  };

  // 번역 함수 - 중첩된 키 지원
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: string | Translations = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // 키를 찾지 못하면 키 자체를 반환
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;