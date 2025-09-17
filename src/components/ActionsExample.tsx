import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

// 사용자 데이터 타입 정의
interface User {
  id: number
  name: string
  email: string
}

// 초기 상태 정의
interface State {
  users: User[]
  error?: string
  message?: string
}

const initialState: State = {
  users: [
    { id: 1, name: '김철수', email: 'kim@example.com' },
    { id: 2, name: '이영희', email: 'lee@example.com' }
  ]
}

// 서버 API 시뮬레이션 함수
const simulateApiCall = (delay: number = 1000): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 30% 확률로 에러 발생
      if (Math.random() < 0.3) {
        reject(new Error('서버 오류가 발생했습니다.'))
      } else {
        resolve()
      }
    }, delay)
  })
}

// Action 함수: 사용자 추가
async function addUserAction(prevState: State, formData: FormData): Promise<State> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // 입력 검증
  if (!name || !email) {
    return {
      ...prevState,
      error: '이름과 이메일을 모두 입력해주세요.'
    }
  }

  try {
    // API 호출 시뮬레이션
    await simulateApiCall()
    
    // 새 사용자 추가
    const newUser: User = {
      id: Date.now(),
      name,
      email
    }

    return {
      users: [...prevState.users, newUser],
      message: `${name}님이 성공적으로 추가되었습니다!`,
      error: undefined
    }
  } catch (error) {
    return {
      ...prevState,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    }
  }
}

// Action 함수: 사용자 삭제
async function deleteUserAction(prevState: State, formData: FormData): Promise<State> {
  const userId = parseInt(formData.get('userId') as string)

  try {
    // API 호출 시뮬레이션
    await simulateApiCall(500)
    
    return {
      users: prevState.users.filter(user => user.id !== userId),
      message: '사용자가 성공적으로 삭제되었습니다!',
      error: undefined
    }
  } catch (error) {
    return {
      ...prevState,
      error: error instanceof Error ? error.message : '삭제 중 오류가 발생했습니다.'
    }
  }
}

// 제출 버튼 컴포넌트 (useFormStatus 사용)
function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      style={{
        padding: '8px 16px',
        backgroundColor: pending ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: pending ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s'
      }}
    >
      {pending ? '처리 중...' : children}
    </button>
  )
}

// 사용자 추가 폼 컴포넌트
function AddUserForm({ action }: { action: (formData: FormData) => void }) {
  return (
    <form action={action} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>새 사용자 추가</h3>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name">이름: </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          style={{ padding: '4px', marginLeft: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email">이메일: </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          style={{ padding: '4px', marginLeft: '8px' }}
        />
      </div>
      <SubmitButton>사용자 추가</SubmitButton>
    </form>
  )
}

// 사용자 목록 컴포넌트
function UserList({ users, deleteAction }: { users: User[], deleteAction: (formData: FormData) => void }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>사용자 목록</h3>
      {users.length === 0 ? (
        <p>등록된 사용자가 없습니다.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <div>
                <strong>{user.name}</strong> - {user.email}
              </div>
              <form action={deleteAction} style={{ display: 'inline' }}>
                <input type="hidden" name="userId" value={user.id} />
                <SubmitButton>삭제</SubmitButton>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 메인 Actions 예제 컴포넌트
export default function ActionsExample() {
  // useActionState 훅 사용 - 사용자 추가
  const [addState, addUserFormAction] = useActionState(addUserAction, initialState)
  
  // useActionState 훅 사용 - 사용자 삭제
  const [deleteState, deleteUserFormAction] = useActionState(deleteUserAction, addState)

  // 최신 상태 사용 (삭제 상태가 더 최신)
  const currentState = deleteState.users.length !== addState.users.length ? deleteState : addState

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>React 19 Actions 예제</h2>
      
      {/* 상태 메시지 표시 */}
      {currentState.error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ❌ {currentState.error}
        </div>
      )}
      
      {currentState.message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ✅ {currentState.message}
        </div>
      )}

      {/* 사용자 추가 폼 */}
      <AddUserForm action={addUserFormAction} />
      
      {/* 사용자 목록 */}
      <UserList users={currentState.users} deleteAction={deleteUserFormAction} />
      
      {/* Actions 설명 */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
        <h3>🚀 React 19 Actions 주요 특징</h3>
        <ul>
          <li><strong>useActionState</strong>: 비동기 작업의 상태를 자동으로 관리</li>
          <li><strong>useFormStatus</strong>: 폼 제출 상태(pending)를 추적</li>
          <li><strong>자동 에러 처리</strong>: try-catch 없이도 에러 상태 관리</li>
          <li><strong>Form 통합</strong>: HTML form의 action 속성과 자연스럽게 연동</li>
          <li><strong>타입 안전성</strong>: TypeScript와 완벽 호환</li>
        </ul>
      </div>
    </div>
  )
}
