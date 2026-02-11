# React 19 학습 프로젝트

React 19의 새로운 기능들과 기본 개념들을 체계적으로 학습할 수 있는 프로젝트입니다.

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트 (Button, Input 등)
│   └── layout/          # 레이아웃 컴포넌트 (Navigation 등)│  
├── examples/            # 학습 예제들
│   ├── basics/          # 기본 개념 (useState, useEffect 등)
│   ├── react19/         # React 19 새 기능들(useActionState, useFormStatus 등)
│   ├── hooks/           # 커스텀 훅 예제
│   ├── patterns/        # 리액트 패턴들
│   │   └── large-data/  # 대용량 데이터 처리 패턴
│   └── advanced/        # 고급 개념들(i18n, Redux)
├── hooks/               # 커스텀 훅 정의
├── types/               # TypeScript 타입 정의
├── styles/              # 스타일 파일들
└── assets/              # 이미지, 아이콘 등
```

## 📚 학습 내용

### 기본 개념 (Basics)
- **useState**: 상태 관리의 기본
- **useEffect**: 사이드 이펙트 처리
- **useContext**: 컨텍스트 API 사용
- **useCallback**: 콜백 함수 재사용
- **memo**: 메모이제이션

### React 19 새 기능
- **useActionState**: 서버 상태와 폼 처리의 새로운 방식
- **useFormStatus**: 폼 상태 관리
- **useOptimistic**: 낙관적 업데이트로 UX 개선
- **use**: 컨텍스트 API 사용의 새로운 방식
- **React Compiler**: 빌드단계에서 컴포넌트 렌더링 최적화 

### 커스텀 훅 (Custom Hooks)
- **useCounter**: 카운터 로직 재사용
- **useLocalStorage**: localStorage와 상태 동기화
- **useFetch**: HTTP 요청 처리

### Advanced
- **i18n**: 다국어지원 기능
  - **react-i18next**: React에서 i18n 처리
- **Redux**: Redux 툴킷 이용한 store 관리

### 리액트 패턴 (Patterns)
- **대용량 데이터 처리**: 효율적인 데이터 렌더링 기법
  - **가상 스크롤링 (Virtualization)**: 화면에 보이는 항목만 렌더링 (직접 구현)
  - **페이지네이션 (Pagination)**: 데이터를 페이지 단위로 분할
  - **무한 스크롤 (Infinite Scroll)**: 자동으로 다음 데이터 로드
  - **검색 최적화 (Debouncing & Throttling)**: 성능 향상 기법
  - **react-window**: 경량화된 가상 스크롤링 라이브러리 (권장 ⭐)
  - **react-virtualized**: 풍부한 기능의 가상 스크롤링 라이브러리

## 🛠 기술 스택

- **React 19**: 최신 React 버전
- **TypeScript**: 타입 안전성
- **Vite**: 빠른 개발 환경
- **ESLint**: 코드 품질 관리

## 📖 학습 가이드

1. **기본 개념부터 시작**: `useState`와 `useEffect` 예제로 React의 기본을 익히세요
2. **React 19 새 기능 탐험**: Actions와 Optimistic Updates를 통해 최신 기능을 학습하세요
3. **커스텀 훅 활용**: 로직 재사용의 패턴을 익히세요
4. **대용량 데이터 처리**: 실무에서 자주 마주치는 성능 최적화 기법을 익히세요
5. **코드 구조 이해**: 체계적인 디렉토리 구조를 통해 확장 가능한 앱 구조를 학습하세요

## 🎯 학습 목표

- React의 핵심 개념 이해
- React 19의 새로운 기능 활용
- 재사용 가능한 컴포넌트와 훅 작성
- TypeScript와 React의 조합 활용
- 대용량 데이터 처리 및 성능 최적화 기법 습득
- 체계적인 프로젝트 구조 설계

## 📝 추가 학습 리소스

### React
- [React 공식 문서](https://react.dev)
- [React 19 릴리즈 노트](https://react.dev/blog/2024/04/25/react-19)

### TypeScript
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

### Redux Toolkit
- [Redux Toolkit 소개](https://redux-toolkit.js.org/)
- [createSlice API](https://redux-toolkit.js.org/api/createSlice)
- [TypeScript Quick Start](https://redux-toolkit.js.org/tutorials/typescript)

### 성능 최적화
- [react-window](https://github.com/bvaughn/react-window) - 가상 스크롤링 라이브러리
- [react-virtualized](https://github.com/bvaughn/react-virtualized) - 고급 가상화 라이브러리
- [Intersection Observer API](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) - 무한 스크롤 구현

---

각 예제를 직접 실행해보고 코드를 수정해보면서 React의 동작 원리를 체험해보세요! 🎉
