import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// 사용자 정보 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Auth Context 타입 정의
interface AuthContextType {
  user: User | null;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props 타입 정의
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Context Provider 컴포넌트
 *  - context 정보를 세팅함
 *  - 로컬스토리지 확인
 *  - 로그인, 로그아웃, 사용자 역할
 *
 * AuthProvider is a React functional component that provides authentication-related context to its child components.
 * It manages user authentication state, including login, logout, and role-based access control, and supports persistent
 * user state storage using localStorage.
 *
 * This component relies on the `useState` and `useEffect` hooks for state management and initialization. It uses an
 * `AuthContext.Provider` to share authentication-related values and functions across the component tree.
 *
 * The `AuthProvider` handles:
 * - Retrieving and storing user data in localStorage to maintain a persistent authentication state.
 * - Providing a login method to authenticate users and store their information.
 * - Providing a logout method to clear user data and reset authentication state.
 * - Checking user authentication status.
 * - Validating user roles for implementing role-based access.
 */
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // 컴포넌트 마운트 시 로컬 스토리지에서 사용자 정보 확인
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsInitializing(false);
    }, 500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string): Promise<boolean> => {
    // API 호출시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 로그인 시뮬레이션을 위한 더미 로직
    // state 데이터 세팅 및 로컬스토리지 데이터 세팅
    if (email === 'admin@example.com' && password === 'admin') {
      const adminUser: User = {
        id: 1,
        name: '관리자',
        email: 'admin@example.com',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'user@example.com' && password === 'user') {
      const normalUser: User = {
        id: 2,
        name: '일반 사용자',
        email: 'user@example.com',
        role: 'user'
      };
      setUser(normalUser);
      localStorage.setItem('user', JSON.stringify(normalUser));
      return true;
    }
    return false;
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // 인증 여부
  const isAuthenticated = user !== null;

  // 사용자 역할
  const hasRole = (role: string) => {
    return user?.role === role;
  };

  // Provider props 값 세팅
  const value: AuthContextType = {
    user,
    isInitializing,
    login,
    logout,
    isAuthenticated,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useContext 래핑 context 커스텀 훅
 *
 * Custom hook to access the authentication context.
 * This hook provides access to the authentication state and functionality
 * stored in the AuthContext.
 *
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * 로그인 입력폼 및 서브밋 컴포넌트
 *
 * LoginForm is a React functional component that renders a login form.
 * It allows users to input an email and password to authenticate their account.
 *
 * The component manages the email, password, and form submission state internally
 * using React's `useState` hook. It also includes error handling for login failure
 * and visual feedback during the submission.
 *
 * Functionality:
 *
 * - Users can input their email and password via controlled input fields.
 * - When submitted, the form triggers the `handleSubmit` function, which:
 *   - Prevents the default form submission behavior.
 *   - Attempts to log in using the `login` function from `useAuth`.
 *   - Displays an error message if the login fails.
 *   - Disables the submit button and shows a "submitting" state while processing.
 *
 * - Includes styling for a user-friendly UI, such as form field labels, error
 *   messages, and a visually distinct submit button.
 */
const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // form submit 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const success = await login(email, password);
      console.log('로그인 결과:', success);
      if (!success) {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginLeft: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', textAlign: 'left' }}>
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginLeft: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold',  textAlign: 'left' }}>
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            required
          />
        </div>
        {/* 에러 발생시 */}
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: submitting ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
      
      <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>
        <p style={{ marginLeft: '20px', textAlign: 'left' }}><strong>💡 테스트 계정</strong></p>
        <ul>
          <li style={{ textAlign: 'left' }}>관리자: admin@example.com / admin</li>
          <li style={{ textAlign: 'left' }}>일반 사용자: user@example.com / user</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * 사용자 인증 정보 내용을 표시해주는 컴포넌트
 *
 * A React functional component that displays a user profile.
 * It includes user information such as name, email, and role.
 * The component also features conditional rendering for content
 * specific to admin users and a logout button.
 *
 * This component retrieves the user information, logout function,
 * and role-check functionality from a custom authentication hook.
 *
 * - Displays the user's name, email, and role.
 * - Indicates administrative privileges if the user holds the "admin" role.
 * - Shows admin-specific content for users with the "admin" role.
 * - Includes a logout button that triggers the logout function.
 *
 * The component is styled using inline styles for layout and formatting purposes.
 *
 */
const UserProfile: React.FC = () => {
  const { user, logout, hasRole } = useAuth();

  if (!user) return null;

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#f0f8ff'
    }}>
      <h2>사용자 프로필</h2>
      <ul style={{ marginBottom: '1rem' }}>
        <li style={{ textAlign: 'left' }}><strong>이름 : </strong> {user.name}</li>
        <li style={{ textAlign: 'left' }}><strong>이메일 : </strong> {user.email}</li>
        <li style={{ textAlign: 'left' }}><strong>역할 : </strong>
          <span style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: hasRole('admin') ? '#58b06d' : '#ef6c27',
            color: 'white',
            borderRadius: '4px',
            marginLeft: '0.5rem'
          }}>
            {user.role === 'admin' ? '관리자' : '일반 사용자'}
          </span>
        </li>
      </ul>
      
      {hasRole('admin') && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          <h4>🔑 관리자 권한</h4>
          <p>관리자만 볼 수 있는 콘텐츠입니다.</p>
        </div>
      )}
      
      <button
        onClick={logout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

/**
 * 사용자 인증여부에 따라 다른 내용을 표시해주는 컴포넌트
 *
 * ProtectedContent is a React functional component that displays different content
 * based on the user's authentication status.
 *
 * If the user is authenticated, it renders a section with protected content.
 * The user's information, such as their name, is displayed as part of the content.
 *
 * If the user is not authenticated, it renders a styled message prompting the user
 * to log in in order to view the protected content.
 *
 * This component utilizes the `useAuth` hook to obtain the authentication status and
 * user information from the application context.
 *
 */
const ProtectedContent: React.FC = () => {
  // 컨텍스트 값 참조
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{
        maxWidth: '600px',
        padding: '2rem',
        margin: '2rem',
        backgroundColor: '#eaf1fa',
        border: '1px solid #BDD3FF',
        borderRadius: '4px',
      }}>
        <h3>🔒 로그인이 필요합니다</h3>
        <p>이 콘텐츠를 보려면 먼저 로그인해주세요.</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem',
      padding: '2rem',
      border: '1px solid #28a745',
      borderRadius: '4px',
      backgroundColor: '#d4edda'
    }}>
      <h3>🎉 보호된 콘텐츠</h3>
      <p>안녕하세요, {user?.name}님! 인증된 사용자만 볼 수 있는 콘텐츠입니다.</p>
      <p>Context를 통해 전역적으로 인증 상태를 관리하고 있습니다.</p>
    </div>
  );
};

/**
 * 인증 컨텍스트 예제를 위한 메인 컴포넌트
 *  - 컨텍스트 값 참조
 *  - 사용자 정보 확인 중을 위한 로딩중 표시 기능(로컬스토리지 확인)
 *  - 사용자 정보 존재에 따라, 로그인 입력폼, 사용자 프로필 정보
 *  - 사용자 정보 종류에 따라, 안내문구 표시
 *
 * AuthContextExample is a functional React component that demonstrates the use of an authentication context.
 * The component manages the initialization state and the authentication state.
 *
 * Functionalities:
 * - Displays a loading screen while the authentication state is being initialized.
 * - Presents a login form if the user is not authenticated.
 * - Shows the user's profile alongside protected content once authenticated.
 * - Renders a styled section describing the key features of the authentication context.
 *
 * Key Features Demonstrated:
 * - Global authentication state management.
 * - Implementation of login and logout.
 * - Role-based access control.
 * - Integration with local storage.
 * - Management of loading states.
 * - Implementation of protected routes and components.
 */
const AuthContextExample: React.FC = () => {
  const { isAuthenticated, isInitializing } = useAuth();

  // isInitializing : AuthProvider 컴포넌트에서 값 세팅
  if (isInitializing) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>로딩 중...</h2>
      </div>
    );
  }

  return (
    <div>
      <div style={{ border : '1px solid #ccc' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          인증 Context 예제
        </h2>
        {/* isAuthenticated : AuthProvider 컴포넌트에서 값 세팅*/}
        {!isAuthenticated ? <LoginForm /> : <UserProfile />}
        {/* AuthProvider 세팅 값 참조*/}
        <ProtectedContent />
      </div>
      <div style={{ 
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '2rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px'
      }}>
        <h4 style={{ textAlign: 'left', marginLeft: '1rem' }}>✅ 인증 Context의 특징</h4>
        <ul>
          <li style={{ textAlign: 'left'}}>전역 인증 상태 관리</li>
          <li style={{ textAlign: 'left'}}>로그인/로그아웃 기능</li>
          <li style={{ textAlign: 'left'}}>역할 기반 접근 제어</li>
          <li style={{ textAlign: 'left'}}>로컬 스토리지 연동</li>
          <li style={{ textAlign: 'left'}}>로딩 상태 관리</li>
          <li style={{ textAlign: 'left'}}>보호된 라우트/컴포넌트 구현</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Provider 로 컨텍스트 컴포넌트 래핑
 *
 * AuthContextExampleWithProvider is a functional React component that wraps the AuthContextExample component
 * with an AuthProvider. It ensures that AuthContextExample has access to the authentication context provided
 * by AuthProvider.
 *
 * This component simplifies the process of supplying authentication context to its child component(s).
 *
 * It is primarily used as a wrapper to supply context necessary for the AuthContextExample component to function properly.
 */
const AuthContextExampleWithProvider: React.FC = () => {
  return (
    <AuthProvider>
      <AuthContextExample />
    </AuthProvider>
  );
};

export default AuthContextExampleWithProvider;
