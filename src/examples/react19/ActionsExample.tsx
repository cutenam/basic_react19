import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import Button from "../../components/common/Button";

interface FormState {
  success?: string;
  error?: string;
}

interface MessageState {
  messages: string[];
  error?: string;
}

/**
 * React 19 Actions 기능 예제
 */

/**
 * formAction 함수가 호출하는 원본 액션 함수, useActionState 에 전달됨, form action 속성에 정의
 *
 * Processes the submission of a form and validates provided data.
 * Simulates a network delay before performing the validation.
 */
async function submitForm(_prevState: FormState | null, formData: FormData): Promise<FormState> {
  // 제출된 폼 데이터
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 제출된 폼데이터 체크(Validation)
  if (!name || !email) {
    return { error: '이름과 이메일을 모두 입력해주세요.' };
  }
  
  if (!email.includes('@')) {
    return { error: '올바른 이메일 형식이 아닙니다.' };
  }
  
  return { success: `${name}님, 성공적으로 제출되었습니다!` };
}

/**
 * form 데이터 처리시, 사용하는 useActionState 훅을 이용한 예제 함수
 *
 * A React component that demonstrates form submission using the `useActionState` hook.
 * Handles form submission states such as pending, success, and error.
 * Includes input fields for user details (name and email) and a submission button.
 */
export default function ActionsExample() {

  /**
   * useActionState : 폼제출 관련 비동기 액션을 쉽게 관리해주는 hook
   *  - state : formAction 리턴값
   *  - formAction : form action 함수, 여기에서는 submitForm
   *  - isPending : formAction 실행중 여부, true/false
   */
  const [state, formAction, isPending] = useActionState(submitForm, null);
  
  return (
    <div style={{ display: 'flex', padding: '20px', border: '1px solid #ccc', margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
      <h2>React 19 Actions 예제</h2>
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px'}}>
        <input
          name="name" 
          placeholder="이름을 입력하세요"
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input 
          name="email" 
          type="email" 
          placeholder="이메일을 입력하세요"
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <Button
          type="submit" 
          disabled={isPending}
          variant='function'
          size='large'
          style={{
            backgroundColor: isPending ? '#218838' : '#28a745',
            color: 'white',
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          {isPending ? '제출 중...' : '제출하기'}
        </Button>
      </form>
      {state?.error && (
        <p style={{ color: 'red', marginTop: '10px' }}>{state.error}</p>
      )}
      {state?.success && (
        <p style={{ color: 'green', marginTop: '10px' }}>{state.success}</p>
      )}
    </div>
  );
}

/**
 * Optimistic Updates 예제
 * 입력한 메시지가 서버에 전송 중일 때, UI에 먼저 반영하여 사용자 피드백 제공
 *
 * An example component demonstrating optimistic UI updates.
 * The component manages a list of messages, where new messages are first
 * optimistically added to the UI before a server response confirms the update.
 *
 * It provides a mechanism to handle real-time user feedback while awaiting
 * server confirmation, enhancing user experience in asynchronous operations.
 *
 */
export function OptimisticExample() {
  /**
   *
   * setMessages
   *  서버 메시지 가져오거나, 입력 데이터를 서버에 반영함
   *  useActionState hook 이용
   *
   * A collection of messages, typically used for displaying or managing
   * user-facing text within the application. This variable may contain
   * predefined text strings that provide feedback, instructions, or
   * notifications to users.
   */
  const [state, setMessages] = useActionState(
    async (prevState: MessageState, message: string): Promise<MessageState> => {
      // 네트워크 지연 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 50% 확률로 에러 발생하여 자동 롤백 테스트
      const isError = Math.random() < 0.5;
      
      if (isError) {
        // 에러 발생 시: 이전 상태 유지 + 에러 메시지 설정
        return {
          messages: prevState.messages, // 🔑 자동 롤백: 이전 상태 그대로 유지
          error: '❌ 서버 오류가 발생했습니다. 다시 시도해주세요.'
        };
      }
      
      // 성공 시: 새 메시지 추가 + 에러 상태 초기화
      return {
        messages: [...prevState.messages, `✅ 서버 반영: ${message}`],
        error: undefined
      };
    },
    { messages: ['👋 안녕하세요! 메시지를 입력해보세요.'], error: undefined } // 초기 상태
  );

  const messages = state.messages;

  /**
   *
   * addOptimisticMessage
   *  useOptimistic : 서버 비동기 작업 중, UI먼저 업데이트 가능하도록 해주는 hook
   *  서버 업데이트가 실패하면 자동 롤백됨
   *
   * A collection or list of messages representing optimistic updates.
   * These messages are used to provide immediate feedback to the user
   * in scenarios where a state change is anticipated but not yet confirmed
   * (e.g., before a server response is received).
   *
   * The contents of this variable may include messages that are temporarily added
   * to the interface to simulate a successful operation and improve the user experience.
   *
   * Proper management of these messages is essential for ensuring they are
   * removed or updated once the actual operation is completed or fails.
   */
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,   // setMessages 에 의해 세팅된 메시지
    (state, newMessage: string) => [...state, `임시: ${newMessage}`]  // 낙관적 업데이트 함수
  );

  /**
   * form 액션 함수
   *  제출 버튼 클릭시 호출됨
   *  낙관적 업데이트를 위해 addOptimisticMessage 함수 및 실제 서버 반영을 위해 setMessages 함수를 호출함
   * Handles the submission of form data, processes the provided message,
   * and updates the application state accordingly.
   *
   * @param {FormData} formData - The form data object containing form inputs.
   * @return {Promise<void>} A promise that resolves when the form submission
   *         and subsequent actions are completed.
   */
  async function handleSubmit(formData: FormData): Promise<void> {
    const message = formData.get('message') as string;
    if (message.trim()) {
      // 낙관적 업데이트
      addOptimisticMessage(message);
      // 실제 서버 액션 호출
      setMessages(message);
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Optimistic Updates 예제 (50% 확률로 에러 발생)</h3>
      
      {state.error && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px' 
        }}>
          {state.error}
        </div>
      )}
      
      <div style={{ marginBottom: '15px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px' }}>
        {optimisticMessages.map((msg, index) => (
          <div key={index} style={{ 
            marginBottom: '5px', 
            padding: '5px',
            backgroundColor: msg.startsWith('임시:') ? '#fff3cd' : '#d4edda',
            borderRadius: '4px'
          }}>
            {msg}
          </div>
        ))}
      </div>
      
      <form action={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          name="message" 
          placeholder="메시지를 입력하세요"
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <Button type="submit" variant='function' size='medium' style={{ marginLeft: '5px'}}>전송</Button>
      </form>
    </div>
  );
}

/**
 * useFormStatus 예제
 * 폼 내부의 컴포넌트에서 폼의 제출 상태를 추적할 수 있는 훅
 */

// 서버 액션 시뮬레이션 (파일 업로드)
async function uploadFile(_prevState: any, formData: FormData) {
  const file = formData.get('file') as File;
  const description = formData.get('description') as string;
  
  // 파일 업로드 시뮬레이션 (3초 지연)
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  if (!file || file.size === 0) {
    return { error: '파일을 선택해주세요.' };
  }
  
  if (!description.trim()) {
    return { error: '파일 설명을 입력해주세요.' };
  }
  
  return { 
    success: `파일 "${file.name}" (${Math.round(file.size / 1024)}KB)이 성공적으로 업로드되었습니다!`,
    fileName: file.name,
    fileSize: file.size
  };
}

/**
 * 폼 내부에서 사용되는 제출 버튼 컴포넌트
 * useFormStatus를 사용하여 폼의 제출 상태를 추적
 */
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <div>
      <button 
        type="submit" 
        disabled={pending}
        style={{ 
          padding: '12px 24px', 
          backgroundColor: pending ? '#6c757d' : '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: pending ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {pending ? '업로드 중...' : '파일 업로드'}
      </button>
      
      {/* 폼 상태 정보 표시 */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p><strong>폼 상태:</strong> {pending ? '제출 중' : '대기 중'}</p>
        <p><strong>HTTP 메서드:</strong> {method || 'POST'}</p>
        {data && (
          <p><strong>제출된 데이터:</strong> {data.get('description') || '없음'}</p>
        )}
      </div>
    </div>
  );
}

/**
 * 진행률 표시 컴포넌트
 * useFormStatus를 사용하여 업로드 진행 상태 시각화
 */
function ProgressIndicator() {
  const { pending } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <div style={{ 
      marginTop: '15px', 
      padding: '10px', 
      backgroundColor: '#e3f2fd', 
      borderRadius: '4px',
      border: '1px solid #2196f3'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid #2196f3',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ color: '#1976d2', fontWeight: 'bold' }}>
          파일을 업로드하고 있습니다...
        </span>
      </div>
      
      <div style={{ 
        marginTop: '10px', 
        height: '6px', 
        backgroundColor: '#bbdefb', 
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#2196f3',
          borderRadius: '3px',
          animation: 'progress 3s ease-in-out'
        }}></div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

/**
 * useFormStatus 메인 예제 컴포넌트
 */
export function FormStatusExample() {
  const [state, formAction] = useActionState(uploadFile, null);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>useFormStatus 예제</h3>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        폼 내부 컴포넌트에서 제출 상태를 추적하는 예제입니다.
      </p>
      
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            파일 선택:
          </label>
          <input 
            name="file" 
            type="file"
            accept="image/*,.pdf,.txt,.doc,.docx"
            style={{ 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            파일 설명:
          </label>
          <textarea 
            name="description" 
            placeholder="파일에 대한 설명을 입력하세요"
            rows={3}
            style={{ 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              width: '100%',
              resize: 'vertical'
            }}
          />
        </div>
        
        {/* useFormStatus를 사용하는 제출 버튼 */}
        <SubmitButton />
        
        {/* useFormStatus를 사용하는 진행률 표시 */}
        <ProgressIndicator />
      </form>
      
      {/* 결과 표시 */}
      {state?.error && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px' 
        }}>
          ❌ {state.error}
        </div>
      )}
      {state?.success && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#d4edda', 
          color: '#155724', 
          border: '1px solid #c3e6cb', 
          borderRadius: '4px' 
        }}>
          ✅ {state.success}
        </div>
      )}
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>💡 useFormStatus 주요 기능:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>
          <li><strong>pending:</strong> 폼 제출 중인지 여부</li>
          <li><strong>data:</strong> 제출된 FormData 객체</li>
          <li><strong>method:</strong> HTTP 메서드 (GET, POST 등)</li>
          <li><strong>action:</strong> 폼 액션 함수</li>
        </ul>
      </div>
    </div>
  );
}
