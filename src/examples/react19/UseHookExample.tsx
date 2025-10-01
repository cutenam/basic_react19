import { use, useState, createContext, Suspense, Component } from 'react';
import type {ReactNode} from 'react';

/**
 * React 19 use 훅 예제
 * use 훅은 Promise와 Context를 처리할 수 있는 새로운 훅입니다.
 */

// Context 타입 정의
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Context 생성, 디폴트 테마 라이트
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

// 사용자 데이터 타입
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// 게시물 데이터 타입
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * 사용자 데이터를 가져오는 Promise 함수
 */
async function fetchUser(userId: number): Promise<User> {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 랜덤 에러 시뮬레이션 (50% 확률)
  if (Math.random() < 0.5) {
    throw new Error('사용자 데이터를 불러오는데 실패했습니다.');
  }
  
  return {
    id: userId,
    name: `사용자 ${userId}`,
    email: `user${userId}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
  };
}

/**
 * 게시물 데이터를 가져오는 Promise 함수
 */
async function fetchPosts(userId: number): Promise<Post[]> {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 랜덤 에러 시뮬레이션 (50% 확률)
  if (Math.random() < 0.5) {
    throw new Error('게시물 데이터를 불러오는데 실패했습니다.');
  }
  
  return Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    title: `게시물 ${index + 1} - 사용자 ${userId}`,
    body: `이것은 사용자 ${userId}의 ${index + 1}번째 게시물입니다. React 19의 use 훅을 사용하여 데이터를 불러왔습니다.`,
    userId
  }));
}

/**
 * 테마변경 컴포넌트
 * - use 훅으로 Context 사용
 *
 * ThemeDisplay is a React functional component that displays the current theme and provides a button
 * to toggle between light and dark modes. The component retrieves the theme and toggleTheme function
 * using the ThemeContext via a custom hook and applies appropriate styles dynamically based on the
 * current theme.
 */
function ThemeDisplay() {
  const { theme, toggleTheme } = use(ThemeContext);
  
  return (
    <div style={{ 
      padding: '15px', 
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#343a40',
      color: theme === 'light' ? '#212529' : '#f8f9fa',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4>🧩 현재 테마: {theme === 'light' ? '라이트 모드' : '다크 모드'}</h4>
      <button 
        onClick={toggleTheme}
        style={{
          padding: '8px 16px',
          backgroundColor: theme === 'light' ? '#007bff' : '#ffc107',
          color: theme === 'light' ? 'white' : '#212529',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        테마 변경
      </button>
      <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
        💡 use 훅으로 Context를 사용하고 있습니다.
      </p>
    </div>
  );
}

/**
 * 사용자 프로필 컴포넌트
 * - use 훅으로 Promise 결과 값을 사용하여 사용자 정보 표시
 *
 * Renders a user profile component that displays a user's avatar, name, email,
 * and a confirmation message indicating successful data loading using a hook.
 *
 */
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  
  return (
    <div style={{ 
      padding: '15px', 
      border: '1px solid #dee2e6', 
      borderRadius: '8px',
      marginBottom: '20px',
      backgroundColor: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #007bff'
          }}
        />
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#212529' }}>{user.name}</h3>
          <p style={{ margin: 0, color: '#6c757d' }}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * 사용자 게시물 목록 컴포넌트
 * - use 훅으로 Promise 결과 값을 사용하여 사용자 게시물 정보 표시
 *
 * Renders a list of posts by consuming a promise that resolves to an array of post objects.
 *
 */
function PostsList({ postsPromise }: { postsPromise: Promise<Post[]> }) {
  const posts = use(postsPromise);
  
  return (
    <div>
      <h4 style={{ marginBottom: '15px', color: '#495057' }}>게시물 목록</h4>
      {posts.map((post: Post) => (
        <div key={post.id} style={{
          padding: '15px',
          border: '1px solid #e9ecef',
          borderRadius: '6px',
          marginBottom: '10px',
          backgroundColor: '#f8f9fa'
        }}>
          <h5 style={{ margin: '0 0 8px 0', color: '#212529' }}>{post.title}</h5>
          <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * 로딩 스피너 컴포넌트
 *
 * Renders a loading spinner component with a spinning animation and an optional message.
 *
 */
function LoadingSpinner({ message }: { message: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        border: '4px solid #e3f2fd',
        borderTop: '4px solid #2196f3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ color: '#666', margin: 0 }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Error Boundary 컴포넌트 props 타입 정의
interface ErrorBoundaryProps {
  children: ReactNode;
  onRetry: () => void;
}

// Error Boundary 컴포넌트 state 타입 정의
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 *
 * Error Boundary 컴포넌트
 *  - use 훅에서 발생한 에러를 catch하고 에러 UI를 표시합니다
 *
 * A React component that acts as an error boundary to catch JavaScript errors anywhere in the component tree.
 * It renders a fallback UI when an error occurs and provides functionality to reset its error state.
 *
 * This component is typically used to wrap other components to improve fault tolerance and display
 * a user-friendly error message should something go wrong.
 *
 * Key features:
 * - Captures errors in the child component tree and updates its state to display a fallback UI.
 * - Provides a method to reset the error state and retry rendering the child components.
 * - Logs the caught errors using the componentDidCatch lifecycle method.
 *
 * Props:
 * - onRetry: A callback function that gets invoked when the user opts to retry after encountering an error.
 *
 * State:
 * - hasError: A boolean indicating whether an error has occurred.
 * - error: The actual error object caught by the boundary.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * 정적 메서드
   * 렌더링 중 동기적으로 실행되는 함수
   *
   * Invoked after an error has been thrown during rendering. This lifecycle method enables a component to update its state
   * based on the error that occurred, allowing for graceful error handling and fallback UI rendering.
   *
   * @param {Error} error - The error object that was thrown during rendering.
   * @return {ErrorBoundaryState} The updated state object containing error information to be used for rendering a fallback UI.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * 렌더링 중 발생한 에러 catch
   *  - useEffect 로는 렌더링 이후 실행되므로, 렌더링 중 발생한 에러 catch 할 수 없음
   *
   * A React lifecycle method that is invoked after an error has been thrown by a descendant component.
   * It can be used to log error information or display a fallback UI.
   *
   */
  componentDidCatch(error: Error) {
    console.error('Error Boundary caught:', error);
  }

  // 에러 상태 리셋 메서드
  resetError = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // 에러 발생 시 에러 UI 렌더링
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>❌ 오류 발생</h4>
          <p style={{ margin: '0 0 15px 0' }}>{this.state.error.message}</p>
          <button 
            onClick={this.resetError}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * use 훅 메인 예제 컴포넌트
 * - Context Provider 컴포넌트
 * - Suspense 컴포넌트 활용, 여러개의 컴포넌의 Promise처리 가능하도록 함
 * - 라이트, 다크모드 변경 컴포넌트
 * - 사용자 프로필, 게시물 정보 표시 컴포넌트
 *
 * A React functional component that demonstrates usage of React hooks,
 * including `useState`, `Suspense`, and Context management, to handle asynchronous data fetching, theme toggling, and user-specific data rendering.
 *
 * The component includes:
 * - Context Provider for managing theme toggling.
 * - Dynamic data fetching for user profiles and posts.
 * - Error boundary integration for error handling during data fetching.
 * - Hooks for managing state and promises in a concise manner.
 *
 */
export default function UseHookExample() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userId, setUserId] = useState(1);
  const [userPromise, setUserPromise] = useState(() => fetchUser(1));
  const [postsPromise, setPostsPromise] = useState(() => fetchPosts(1));
  // const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);

  /**
   * Provider로 제공할 Context 함수
   *
   * Toggles the current theme between 'light' and 'dark' modes.
   *
   * The function updates the theme state by switching its value from
   * 'light' to 'dark' or from 'dark' to 'light' based on the previous state.
   *
   * This is useful for implementing a theme-switching mechanism in applications
   * that support both light and dark themes.
   */
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /**
   * 에러 발생 시, handleRetry 메서드 통해서 상태값 재설정, API 재호출이 가능하도록 함
   *
   * Updates the application state with the data associated with a new user.
   *
   * This function performs the following actions:
   * 1. Sets the user ID to the provided identifier.
   * 2. Initiates fetching of user data and their associated posts.
   * 3. Resets the error boundary key to handle any potential errors during loading.
   *
   */
  const loadUserData = (newUserId: number) => {
    setUserId(newUserId);
    setUserPromise(fetchUser(newUserId));
    setPostsPromise(fetchPosts(newUserId));
    // Error Boundary 리셋
    // setErrorBoundaryKey(prev => prev + 1);
  };
  //
  /**
   * ErrorBoundary 내부에서 에러 관련 state 정보를 초기화 함
   *
   * A function to handle retry logic by reloading user data.
   * This function is intended to be triggered in scenarios where retrying an action is needed,
   * such as recovering from an error or ensuring data integrity.
   *
   * It invokes the `loadUserData` method using the provided `userId` to reload user-specific data.
   */
  const handleRetry = () => {
    loadUserData(userId);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>React 19 use 훅 예제</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          use 훅을 사용하여 Promise와 Context를 처리하는 예제입니다.
        </p>

        {/* 테마 변경 */}
        <ThemeDisplay />

        {/* 사용자 선택 */}
        <div style={{ marginBottom: '20px' }}>
          <h4>사용자 선택:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5].map(id => (
              <button
                key={id}
                onClick={() => loadUserData(id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: userId === id ? '#007bff' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                사용자 {id}
              </button>
            ))}
          </div>
        </div>

        {/* Error Boundary 로 감싸서, 에러 발생 시 메시지 노출 및 재시도 기능 표시 */}
        <ErrorBoundary 
          // key={errorBoundaryKey}
          onRetry={handleRetry}
        >
          <div>
            {/* 사용자 프로필 */}
            <Suspense fallback={<LoadingSpinner message="사용자 정보를 불러오는 중..." />}>
              <UserProfile userPromise={userPromise} />
            </Suspense>

            {/* 게시물 목록 */}
            <Suspense fallback={<LoadingSpinner message="게시물을 불러오는 중..." />}>
              <PostsList postsPromise={postsPromise} />
            </Suspense>
          </div>
        </ErrorBoundary>

        {/* use 훅 관련 설명 */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}>
          <h4 style={{ margin: '0 0 15px 0'}}>✅ use 훅의 주요 특징</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ textAlign: 'left'}}><strong>Promise 처리:</strong> async/await 없이 Promise를 직접 사용</li>
            <li style={{ textAlign: 'left'}}><strong>Context 사용:</strong> useContext 대신 use 훅으로 Context 접근</li>
            <li style={{ textAlign: 'left'}}><strong>Suspense 통합:</strong> Promise가 해결될 때까지 자동으로 Suspense 트리거</li>
            <li style={{ textAlign: 'left'}}><strong>조건부 사용:</strong> 조건문 내에서도 사용 가능 (기존 훅 규칙과 다름)</li>
            <li style={{ textAlign: 'left'}}><strong>에러 처리:</strong> Promise reject 시 가장 가까운 Error Boundary로 전파</li>
          </ul>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
