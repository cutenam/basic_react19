import { useActionState } from 'react';
import Button from "../../components/common/Button";

interface FormState {
  success?: string;
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