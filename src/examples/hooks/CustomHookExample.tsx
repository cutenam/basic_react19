import { useState, useEffect } from 'react';
import { useCounter, useLocalStorage, useFetch } from '../../hooks';

/**
 * 커스텀 훅 사용 예제
 */
export default function CustomHookExample() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>커스텀 훅 예제</h3>
      
      <CounterHookExample />
      <LocalStorageHookExample />
      <FetchHookExample />
    </div>
  );
}

function CounterHookExample() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>useCounter 훅</h4>
      <p>카운트: {count}</p>
      <button onClick={increment} style={{ marginRight: '5px' }}>증가</button>
      <button onClick={decrement} style={{ marginRight: '5px' }}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}

function LocalStorageHookExample() {
  const [name, setName] = useLocalStorage('userName', '');
  
  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>useLocalStorage 훅</h4>
      <p>저장된 이름: {name || '없음'}</p>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요 (자동 저장됨)"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      <button onClick={() => setName('')}>지우기</button>
    </div>
  );
}

function FetchHookExample() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  
  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4>useFetch 훅</h4>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>에러: {error}</p>}
      {data && (
        <div>
          <h5>{data.title}</h5>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}
