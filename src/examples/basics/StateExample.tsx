import { useState } from 'react';

/**
 * useState 기본 사용법 예제
 * A React functional component demonstrating the usage of the `useState` hook.
 * The component includes three sections:
 * - A counter with increment, decrement, and reset functionality.
 * - Input text management for updating a name state.
 * - A toggle button for showing or hiding a text element.
 *
 * @return {JSX.Element} A styled container displaying interactive examples of `useState` usage.
 */
export default function StateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>useState 기본 예제</h2>
      
      {/* 숫자 상태 */}
      <h3>1. 카운터</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>카운트: {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '5px' }}>감소</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '5px' }}>리셋</button>
      </div>

      {/* 문자열 상태 */}
      <h3>2. input 텍스트 입력</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>이름: {name || '이름을 입력하세요'}</p>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>

      {/* Boolean 상태 */}
      <h3>3. 토글 버튼</h3>
      <div>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? '숨기기' : '보이기'}
        </button>
        {isVisible && (
          <p style={{ color: 'blue', marginTop: '10px' }}>
            이 텍스트는 토글됩니다!
          </p>
        )}
      </div>
    </div>
  );
}
