import { useContext } from 'react';
import type { LanguageContextType } from './types';
import LanguageContext from './LanguageContext';

/**
 * LanguageContext를 래핑 리턴하는 커스텀 훅
 *
 * Custom hook to access the language context
 */
export default function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
