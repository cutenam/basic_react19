import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from "../../components/common/Button";

interface uploadState {
  success?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
}

/**
 * React 19 Actions 기능 예제
 */

/**
 * useFormStatus 예제 설명 메인 컴포넌트
 *  useActionState 훅과 함께 사용하여 파일 업로드 상태를 처리함
 *
 *  useFormStatus : 폼 내부의 컴포넌트에서 폼의 제출 상태를 추적할 수 있는 훅
 *  SubmitButton : 제출 버튼 컴포넌트
 *  ProgressIndicator : 진행률 표시 컴포넌트
 *
 * Represents an example of a form status handling component using `useActionState` and React hooks.
 * This component provides a UI for file upload with description, tracks submission status,
 * and displays success or error messages with auto-hide functionality after 3 seconds.
 *
 */
export default function FormStatusExample() {
  const [state, formAction] = useActionState(uploadFile, null);
  const [showMessage, setShowMessage] = useState(true);

  // 알림 메시지 자동 비표시 (3초 후 메시지 숨김)
  useEffect(() => {
    if (state?.error || state?.success) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state]); // state 객체 전체를 의존성으로 사용
  
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

        {/* 결과 표시 - 3초 후 자동 사라짐 */}
        {state?.error && showMessage && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            transition: 'opacity 0.3s ease-out',
            opacity: showMessage ? 1 : 0
          }}>
            {state.error}
          </div>
        )}
        {state?.success && showMessage && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            transition: 'opacity 0.3s ease-out',
            opacity: showMessage ? 1 : 0
          }}>
            {state.success}
          </div>
        )}
        {/* useFormStatus를 사용하는 제출 버튼 */}
        <SubmitButton/>
        {/* useFormStatus를 사용하는 진행률 표시 */}
        <ProgressIndicator />
      </form>

      {/*<div style={{ */}
      {/*  marginTop: '20px', */}
      {/*  padding: '15px', */}
      {/*  backgroundColor: '#f8f9fa', */}
      {/*  borderRadius: '4px',*/}
      {/*  fontSize: '14px'*/}
      {/*}}>*/}
      {/*  <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>💡 useFormStatus 주요 기능:</h4>*/}
      {/*  <ul style={{ margin: 0, paddingLeft: '20px', color: '#6c757d' }}>*/}
      {/*    <li style={{ textAlign: 'left' }}><strong>pending:</strong> 폼 제출 중인지 여부</li>*/}
      {/*    <li style={{ textAlign: 'left' }}><strong>data:</strong> 제출된 FormData 객체</li>*/}
      {/*    <li style={{ textAlign: 'left' }}><strong>method:</strong> HTTP 메서드 (GET, POST 등)</li>*/}
      {/*    <li style={{ textAlign: 'left' }}><strong>action:</strong> 폼 액션 함수</li>*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  );
}

/**
 * 파일 업로드 처리 함수
 *  폼에서 파일 선택 시, useActionState 에 의해 호출됨
 *  리턴값은 useActionState의 반환 값 중 state에 할당됨
 *
 * Simulates the upload of a file with optional description.
 * Introduces a delay to mimic the upload process and has a 50% chance of simulating an error.
 * A promise that resolves to an object containing either an error message or a success message with file details.
 */
async function uploadFile(_prevState: uploadState | null, formData: FormData): Promise<uploadState> {
  const file = formData.get('file') as File;
  const description = formData.get('description') as string;

  // 파일 선택 여부를 먼저 검증 (즉시 반환)
  if (!file || file.size === 0) {
    return { error: '👉🏻 파일을 선택해주세요.' };
  }

  if (!description.trim()) {
    return { error: '👉🏻 파일 설명을 입력해주세요.' };
  }

  // 검증 통과 후에만 파일 업로드 시뮬레이션 (3초 지연)
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 50% 확률로 에러 발생
  const isError = Math.random() < 0.5;

  if (isError) {
    // 에러 발생 시: 이전 상태 유지 + 에러 메시지 설정
    return {
      error: '❌ 서버 오류가 발생했습니다. 다시 시도해주세요.'
    };
  }

  return {
    success: `✅ 파일 "${file.name}" (${Math.round(file.size / 1024)}KB)이 성공적으로 업로드되었습니다!`,
    fileName: file.name,
    fileSize: file.size
  };
}

/**
 * 폼 내부에서 사용되는 제출 버튼 기능 함수
 *  useFormStatus 훅을 사용하여 폼의 제출 상태를 추적하여 정보를 표시
 *
 * Renders a submit button for a form, which is styled dynamically based on the
 * form's submission status. Displays form status information such as pending state,
 * HTTP method, and submitted data as additional context.
 *
 */
function SubmitButton() {
  /**
   *  useFormStatus
   *    pending : 폼 제출 중 여부, true/false, submit 클릭하면 무조건 true로 변경됨
   *    data : 폼 제출 데이터, FormData 객체
   *    method : HTTP 메서드, 'POST' 또는 'PUT' 등
   */
  const { pending, data, method } = useFormStatus();

  return (
    <div>
      <Button
        type="submit"
        disabled={pending}
        variant='function'
        size='large'
        style={{
          backgroundColor: pending ? '#218838' : '#28a745',
          color: 'white',
          cursor: pending  ? 'not-allowed' : 'pointer'
        }}
      >
        {(pending)? '업로드 중...' : '파일 업로드'}
      </Button>

      {/* 폼 상태 정보 표시 */}
      <ul style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <li style={{ textAlign: 'left' }}><strong>폼 상태:</strong> {pending ? '제출 중' : '대기 중'}</li>
        <li style={{ textAlign: 'left' }}><strong>HTTP 메서드:</strong> {method || 'POST'}</li>
        {data && (
          <li style={{ textAlign: 'left', color: '#FA6666'}}><strong>제출된 데이터:</strong> {(data.get('file') as File)?.name || '없음'}</li>
        )}
      </ul>
    </div>
  );
}

/**
 * 진행률 표시 컴포넌트
 *  useFormStatus를 사용하여 업로드 진행 상태 시각화
 *  Renders a progress indicator when a file upload is in progress. This component is
 *  displayed only if a file is selected, and the upload status is pending. It includes
 *  a spinner for visual feedback and a progress bar to show the upload progression.
 */
function ProgressIndicator() {
  const { pending, data } = useFormStatus();

  // pending이 false이거나 data가 없으면 표시하지 않음
  if (!pending || !data) return null;

  // 파일이 선택되지 않은 경우 진행률 표시하지 않음
  const file = data?.get('file') as File;
  if (!file || file.size === 0) return null;

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