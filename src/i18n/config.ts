import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 번역 파일 import
import translationKO from '../locales/ko/translation.json';
import translationEN from '../locales/en/translation.json';
import translationJP from '../locales/ja/translation.json';

// 번역 리소스
const resources = {
  ko: {
    translation: translationKO,
  },
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJP,
  },
};

// i18next 초기화
i18n
  .use(initReactI18next) // react-i18next 플러그인 사용
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'ko', // 기본 언어 (로컬 스토리지에서 가져오기)
    fallbackLng: 'ko', // 번역이 없을 때 사용할 언어
    
    interpolation: {
      escapeValue: false, // React는 이미 XSS 보호를 제공
    },

    // 디버그 모드 (개발 중에만 활성화)
    debug: false,

    // 네임스페이스 설정
    defaultNS: 'translation',
    ns: ['translation'],

    // 언어 감지 옵션
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    // React 관련 옵션
    react: {
      useSuspense: false, // Suspense 사용 안 함 (필요시 true로 변경)
    },
  });

export default i18n;
