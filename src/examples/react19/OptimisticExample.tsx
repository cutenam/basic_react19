import { useActionState, useOptimistic } from 'react';
import Button from "../../components/common/Button";
import { useTranslation } from 'react-i18next';

interface MessageState {
  messages: string[];
  error?: string;
}

/**
 * React 19 Actions 기능 예제
 */
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
export default function OptimisticExample() {
  const { t } = useTranslation();
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

      // 30% 확률로 에러 발생하여 자동 롤백 테스트
      const isError = Math.random() < 0.3;

      if (isError) {
        // 에러 발생 시: 이전 상태 유지 + 에러 메시지 설정
        return {
          messages: prevState.messages, // 🔑 자동 롤백: 이전 상태 그대로 유지
          error: `❌ ${t('error.checkServer')}`
        };
      }

      // 성공 시: 새 메시지 추가 + 에러 상태 초기화
      return {
        messages: [...prevState.messages, `✅ ${t('features.optimistic.label.saveServer')}: ${message}`],
        error: undefined
      };
    },
    {messages: [`👋 ${t('features.optimistic.label.enterMessage')}`], error: undefined} // 초기 상태
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
    (state, newMessage: string) => [...state, `${t('common.temporary')}: ${newMessage}`]  // 낙관적 업데이트 함수
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
    <div style={{padding: '20px', border: '1px solid #ccc', margin: '10px'}}>
      <h3>{t('features.optimistic.title')}</h3>
      <p style={{ color: '#666', marginBottom: '20px', textAlign: 'left' }}>
        {t('features.optimistic.description.textOptimistic')}
      </p>
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

      <div style={{
        marginBottom: '15px',
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #eee',
        padding: '10px'
      }}>
        {optimisticMessages.map((msg, index) => (
          <div key={index} style={{
            marginBottom: '5px',
            padding: '5px',
            backgroundColor: msg.startsWith(`${t('common.temporary')}:`) ? '#fff3cd' : '#d4edda',
            borderRadius: '4px'
          }}>
            {msg}
          </div>
        ))}
      </div>

      <form action={handleSubmit} style={{display: 'flex', gap: '10px'}}>
        <input
          name="message"
          placeholder={t('common.enterMessage')}
          type="text"
          style={{flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
        />
        <Button type="submit" variant='function' size='medium' style={{marginLeft: '5px'}}>{t('common.send')}</Button>
      </form>
    </div>
  );
}