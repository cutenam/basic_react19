import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
// 1. Context 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// 2. Provider 컴포넌트 정의
/**
 * 테마 설정용 컨텍스트 Provider 컴포넌트
 *  제공할 컨텍스트 값을 설정함(state, 함수)
 *  생성한 컨텍스트 Provider 를 리턴함(ThemeContext)
 *  메인 예제 컴포넌트에서 호출(ContextExample)
 *
 * ThemeProvider is a React Functional Component that manages the application's
 * theme context, allowing consumers to access and toggle between light and dark
 * themes. It uses the React Context API to provide the current theme and a
 * toggle function to all descendants.
 *
 * Props:
 * - children: ReactNode - The child components that will consume the theme context.
 *
 * The context value provided includes:
 * - theme: A string indicating the current theme, either 'light' or 'dark'.
 * - toggleTheme: A function to toggle between light and dark themes.
 *
 * Wrap this component around any part of your application to enable theme
 * management for those components.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom Hook (선택사항이지만 권장)
/**
 * useContext 래핑 훅
 *  컨텍스트 Provider 값들을 리턴함
 *
 * Custom hook to access the current theme context.
 *
 * This hook provides access to the theme context that is supplied by the `ThemeProvider`.
 * It ensures that the context is being used within an appropriate provider and throws an error
 * if it is accessed outside of a `ThemeProvider`.

 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 4. Context를 사용하는 컴포넌트들
/**
 * 컨텍스트 이용하여 테마변경하는 컴포넌트
 *  useContext 호출 결과, 반환값을 이용
 *
 * Header is a functional React component that renders a header element with
 * a dynamic theme based on the current theme context.
 *
 * This component utilizes the `useTheme` hook to consume theme-related context
 * and provides users an option to toggle between light and dark themes using a button.
 *
 * Features:
 * - Dynamically updates styles (background color, text color, border color) based
 *   on the current theme (light or dark).
 * - Displays a toggle button allowing users to switch the theme.
 * - The button's text content and styles adapt according to the active theme.
 *
 * Dependencies:
 * - Requires `useTheme` hook to be available in the component's context to access
 *   `theme` and `toggleTheme` properties.
 *
 * Props:
 * - None
 *
 * Returns:
 * - A styled header element containing a title and a theming toggle button.
 */
const Header: React.FC = () => {
  // useContext 호출, Provider 값들 사용가능
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{
      backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
      color: theme === 'light' ? '#000000' : '#ffffff',
      padding: '1rem',
      borderBottom: `2px solid ${theme === 'light' ? '#eee' : '#555'}`
    }}>
      <h2>Context 예제</h2>
      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: theme === 'light' ? '#007bff' : '#ffc107',
          color: theme === 'light' ? 'white' : 'black',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
      </button>
    </header>
  );
};

/**
 * 컨텍스트 이용하여 테마변경하는 컴포넌트
 *
 * A functional React component representing the main content area of the application.
 * This component utilizes the `useTheme` hook to obtain the current theme context
 * and dynamically applies styles based on the active theme (light or dark mode).
 *
 * Features:
 * - Displays the main content with a theme-sensitive layout.
 * - Shares theme state with other components via Context API.
 * - Contains nested components with their styling also dependent on the active theme.
 *
 * Styling:
 * - The background color, text color, and other style properties adjust based on the theme.
 * - Provides padding, minimum height, and additional styling for a visually distinct section.
 *
 * Nested Components:
 * - Includes a nested component styled according to the current theme.
 *
 * Dependencies:
 * - Requires the `useTheme` hook for theme context.
 * - Contains a reference to a `NestedComponent` for further rendering within the main content.
 */
const Content: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <main style={{
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#222222',
      color: theme === 'light' ? '#000000' : '#ffffff',
      padding: '2rem',
      minHeight: '400px'
    }}>
      <h3>메인 콘텐츠</h3>
      <p>🧩 현재 테마: <strong>{theme === 'light' ? '라이트 모드' : '다크 모드'}</strong></p>
      <p>
        이 컴포넌트는 Header 컴포넌트와 직접적인 부모-자식 관계가 아니지만, 
        Context를 통해 같은 테마 상태를 공유하고 있습니다.
      </p>
      
      <div style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#444444',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem',
        border: `1px solid ${theme === 'light' ? '#ddd' : '#666'}`
      }}>
        <h3>중첩된 컴포넌트</h3>
        <NestedComponent />
      </div>
    </main>
  );
};

const NestedComponent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#e9ecef' : '#555555',
      padding: '1rem',
      borderRadius: '4px',
      marginTop: '0.5rem'
    }}>
      <p>깊게 중첩된 컴포넌트에서도 Context에 접근할 수 있습니다!</p>
      <p>🧩 현재 테마: <strong>{theme === 'light' ? '라이트 모드' : '다크 모드'}</strong></p>
    </div>
  );
};

// 5. 메인 예제 컴포넌트
/**
 *  테마 전환 기능: 라이트/다크 모드 토글
 *  Provider/Consumer 패턴: Context의 핵심 개념 시연
 *  Custom Hook: useTheme 훅으로 Context 사용 최적화
 *  다중 컴포넌트 연동: Header, Content, NestedComponent가 모두 같은 상태 공유
 *
 * A functional React component demonstrating the usage of React Context API.
 *
 * ContextExample showcases the benefits and considerations of using Context
 * for state management and component communication. It wraps child components
 * with a `ThemeProvider` to enable sharing of theming values across the component
 * tree without the need for prop drilling.
 *
 * Key features highlighted in the component:
 * - Explanation of React Context benefits, such as preventing prop drilling,
 *   global state management, and simplifying data sharing.
 * - Notes on potential pitfalls of using Context, including performance trade-offs
 *   and scenarios where alternative libraries might be more appropriate.
 * - A structured layout with styling applied to emphasize the content and maintain readability.
 */
const ContextExample: React.FC = () => {
  return (
    <div>
      <div style={{
        border : '1px solid #ccc'
      }}>
        {/* Provider로 감싸서 하위 컴포넌트들이 Context에 접근할 수 있게 함 */}
        <ThemeProvider>
          <Header />
          <Content />
        </ThemeProvider>
      </div>
      {/* 설명 */}
      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#f0f0f0', 
        marginTop: '2rem',
        borderRadius: '4px'
      }}>
        <h4 style={{textAlign: 'left'}}>✅ Context의 장점</h4>
        <ul>
          <li style={{textAlign: 'left'}}>Prop drilling 방지</li>
          <li style={{textAlign: 'left'}}>전역 상태 관리</li>
          <li style={{textAlign: 'left'}}>컴포넌트 간 데이터 공유 간소화</li>
          <li style={{textAlign: 'left'}}>코드 가독성 향상</li>
        </ul>
        
        <h4 style={{textAlign: 'left'}}>⚠️ 주의사항</h4>
        <ul>
          <li style={{textAlign: 'left'}}>Context 값이 변경되면 모든 Consumer가 리렌더링됨</li>
          <li style={{textAlign: 'left'}}>과도한 사용은 컴포넌트 재사용성을 떨어뜨릴 수 있음</li>
          <li style={{textAlign: 'left'}}>복잡한 상태 관리에는 Redux나 Zustand 같은 라이브러리 고려</li>
        </ul>
      </div>
    </div>
  );
};

export default ContextExample;
