// 지원하는 언어 타입
export type Language = 'ko' | 'en' | 'ja';

// 번역 데이터 타입 (재귀적 타입)
export type Translations = {
  [key: string]: string | Translations;
};

// Context 타입 정의
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Record<Language, Translations>;
}

// 번역 데이터
export const translations: Record<Language, Translations> = {
  ko: {
    common: {
      welcome: '환영합니다',
      hello: '안녕하세요',
      goodbye: '안녕히 가세요',
      yes: '예',
      no: '아니오',
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '수정',
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
    },
    nav: {
      home: '홈',
      about: '소개',
      contact: '연락처',
      settings: '설정',
    },
    app: {
      title: 'React 19 학습 프로젝트',
      description: '체계적으로 구성된 React 학습 예제들을 통해 단계별로 학습해보세요',
      footer: 'React 19 + TypeScript + Vite로 구성된 학습용 프로젝트',
    },
    i18n: {
      title: '다중언어 지원 (i18n)',
      subtitle: 'Context API를 활용한 간단한 국제화 구현',
      currentLanguage: '현재 언어',
      selectLanguage: '언어 선택',
      korean: '한국어',
      english: '영어',
      japan: '일본어',
      example: '예제',
      greeting: '안녕하세요! React 다중언어 지원 예제입니다.',
      description: '이 예제는 Context API를 사용하여 간단한 다중언어 지원을 구현합니다.',
      features: {
        title: '주요 기능',
        feature1: 'Context API를 활용한 전역 언어 상태 관리',
        feature2: '로컬 스토리지를 통한 언어 설정 저장',
        feature3: '중첩된 번역 키 지원',
        feature4: '타입 안전한 번역 함수',
      },
      usage: {
        title: '사용 방법',
        step1: '언어를 선택하면 전체 애플리케이션의 언어가 변경됩니다',
        step2: 't() 함수를 사용하여 번역된 텍스트를 가져옵니다',
        step3: '중첩된 키는 점(.)으로 구분합니다 (예: "common.welcome")',
      },
      counter: {
        title: '카운터 예제',
        count: '현재 카운트',
        increment: '증가',
        decrement: '감소',
        reset: '초기화',
      },
    },
  },
  en: {
    common: {
      welcome: 'Welcome',
      hello: 'Hello',
      goodbye: 'Goodbye',
      yes: 'Yes',
      no: 'No',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
      error: 'An error occurred',
    },
    nav: {
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      settings: 'Settings',
    },
    app: {
      title: 'React 19 Learning Project',
      description: 'Learn React step by step through systematically organized examples',
      footer: 'Learning project built with React 19 + TypeScript + Vite',
    },
    i18n: {
      title: 'Internationalization (i18n)',
      subtitle: 'Simple internationalization implementation using Context API',
      currentLanguage: 'Current Language',
      selectLanguage: 'Select Language',
      korean: 'Korean',
      english: 'English',
      japanese: 'Japanese',
      example: 'Example',
      greeting: 'Hello! This is a React internationalization example.',
      description: 'This example implements simple multi-language support using Context API.',
      features: {
        title: 'Key Features',
        feature1: 'Global language state management using Context API',
        feature2: 'Language settings saved via local storage',
        feature3: 'Support for nested translation keys',
        feature4: 'Type-safe translation function',
      },
      usage: {
        title: 'How to Use',
        step1: 'Selecting a language changes the entire application language',
        step2: 'Use the t() function to get translated text',
        step3: 'Nested keys are separated by dots (e.g., "common.welcome")',
      },
      counter: {
        title: 'Counter Example',
        count: 'Current Count',
        increment: 'Increment',
        decrement: 'Decrement',
        reset: 'Reset',
      },
    },
  },
  ja: {
    common: {
      welcome: 'ようこそ',
      hello: 'ようこそ',
      goodbye: 'さようなら',
      yes: 'はい',
      no: 'いいえ',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      loading: '読み込み中...',
      error: 'エラーが発生しました',
    },
    nav: {
      home: '',
      about: 'About',
      contact: 'Contact',
      settings: '設定',
    },
    app: {
      title: 'React 19 レックチャープロジェクト',
      description: 'React レックチャーサンプルを通し、 段階的に学習してください',
      footer: 'React 19 + TypeScript + Viteで構成されたレクチャープロジェクト',
    },
    i18n: {
      title: '多国語 サポート (i18n)',
      subtitle: 'Context APIを活用した多国語表示機能',
      currentLanguage: '選択言語',
      selectLanguage: '選択',
      korean: '韓国語',
      english: '英語',
      japanese: '日本語',
      example: 'サンプル',
      greeting: 'React 多国語表示のサンプルです',
      description: 'Contextを利用し、 多国語表示を行います',
      features: {
        title: 'メイン機能',
        feature1: 'Context APIの活用し、全域の言語管理',
        feature2: 'ローカルストーレッジの活用し、選択言語の保存',
        feature3: 'ネスト トランスレーションキーの利用',
        feature4: 'タイプセーフ トランスレーション関数',
      },
      usage: {
        title: '使い方',
        step1: '言語を選択すると、 全体のアプリケーションの言語が変更されます',
        step2: 't()関数を使用し、 トランスレーションのテキストを取得します',
        step3: 'ネストのキーはドット(.)で区切ります (例: "common.welcome")',
      },
      counter: {
        title: 'Counter サンプル',
        count: 'Count',
        increment: '増やす',
        decrement: '減らす',
        reset: '初期化',
      },
    },
  },
};
