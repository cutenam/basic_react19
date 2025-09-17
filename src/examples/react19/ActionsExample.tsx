import { useActionState, useOptimistic } from 'react';

/**
 * React 19 Actions 기능 예제
 */

// 서버 액션 시뮬레이션
async function submitForm(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!name || !email) {
    return { error: '이름과 이메일을 모두 입력해주세요.' };
  }
  
  if (!email.includes('@')) {
    return { error: '올바른 이메일 형식이 아닙니다.' };
  }
  
  return { success: `${name}님, 성공적으로 제출되었습니다!` };
}

export default function ActionsExample() {
  const [state, formAction, isPending] = useActionState(submitForm, null);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>React 19 Actions 예제</h3>
      
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
        <button 
          type="submit" 
          disabled={isPending}
          style={{ 
            padding: '10px', 
            backgroundColor: isPending ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          {isPending ? '제출 중...' : '제출하기'}
        </button>
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
 */
export function OptimisticExample() {
  const [messages, setMessages] = useActionState(
    async (prevMessages: string[], message: string) => {
      // 서버에 메시지 전송 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [...prevMessages, `서버 응답: ${message}`];
    },
    ['안녕하세요! 메시지를 입력해보세요.']
  );
  
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [...state, `임시: ${newMessage}`]
  );

  async function handleSubmit(formData: FormData) {
    const message = formData.get('message') as string;
    if (message.trim()) {
      addOptimisticMessage(message);
      // 실제 서버 액션 호출
      setMessages(message);
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Optimistic Updates 예제</h3>
      
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
        <button 
          type="submit"
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          전송
        </button>
      </form>
    </div>
  );
}
