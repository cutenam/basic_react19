import { useActionState } from 'react';
import Button from "../../components/common/Button";
import { useTranslation} from "react-i18next";

interface FormState {
  success?: string;
  error?: string;
}

/**
 * React 19 Actions 기능 예제
 */

/**
 * formAction 함수가 호출하는 원본 액션 함수, useActionState 에 전달됨, form action 속성에 정의
 * - useTranslation 훅은 여기 비동기 함수에서는 호출불가, 컴포넌트 또는 커스텀 훅 내부에서만 호출 가능, 매개변수로 전달받음
 *
 * Processes the submission of a form and validates provided data.
 * Simulates a network delay before performing the validation.
 */
async function submitForm(
  _prevState: FormState | null, 
  formData: FormData,
  t: (key: string, options?: Record<string, unknown>) => string     // i18next t 함수
): Promise<FormState> {
  // 제출된 폼 데이터
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 제출된 폼데이터 체크(Validation)
  if (!name || !email) {
    return { error: t('error.checkNameEmail') };
  }
  
  if (!email.includes('@')) {
    return { error: t('error.checkEmail') };
  }
  
  return { success: t('features.actions.response.submitSuccess', {name}) };
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
   *  - formAction : form action 함수, 여기에서는 submitForm, 필요한경우 추가 매개변수를 전달할 수 있음
   *  - isPending : formAction 실행중 여부, true/false
   */

  const { t } = useTranslation();
  // const [state, formAction, isPending] = useActionState(submitForm, null);
  const [state, formAction, isPending] = useActionState<FormState | null, FormData>(
    (prevState, formData) => submitForm(prevState, formData, t),
    null
  );
  
  return (
    <div style={{ display: 'flex', padding: '20px', border: '1px solid #ccc', margin: '10px', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{t('features.actions.title')}</h2>
      <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px'}}>
        <input
          name="name" 
          placeholder={t('common.enterName')}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input 
          name="email" 
          type="email" 
          placeholder={t('common.enterEmail')}
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
          {isPending ? t('features.actions.label.submitting') : t('features.actions.label.submit')}
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