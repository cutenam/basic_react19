import { useState } from 'react';

/**
 * useState 기본 사용법 예제
 */
export default function StateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>useState 기본 예제</h3>
      
      {/* 숫자 상태 */}
      <div style={{ marginBottom: '15px' }}>
        <p>카운트: {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)} style={{ marginLeft: '5px' }}>감소</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '5px' }}>리셋</button>
      </div>

      {/* 문자열 상태 */}
      <div style={{ marginBottom: '15px' }}>
        <p>이름: {name || '이름을 입력하세요'}</p>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>

      {/* 불린 상태 */}
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
