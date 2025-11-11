import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

/**
 * Redux Counter 예제 컴포넌트
 * - Redux Toolkit을 사용한 간단한 카운터 구현
 */
export default function CounterExample() {
  // dispatch 함수를 useDispatch 훅을 통해 가져옴
  const dispatch = useAppDispatch();
  
  // useAppSelector 훅을 통해 Redux state 접근하여 CounterState 값 가져오기
  const count = useAppSelector((state) => state.counter.value);
  const history = useAppSelector((state) => state.counter.history);
  
  // 로컬 상태: 사용자가 입력한 증가값
  const [incrementAmount, setIncrementAmount] = useState<string>('0');

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>🔢 Redux Counter 예제</h2>
      
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#007bff' }}>
          {count}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => dispatch(increment())}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + 1 증가
        </button>
        
        <button
          onClick={() => dispatch(decrement())}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          - 1 감소
        </button>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '6px'
          }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          값만큼 증가
        </button>
      </div>

      <button
        onClick={() => dispatch(reset())}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        초기화
      </button>

      {/* 히스토리 표시 */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#333' }}>📊 변경 히스토리</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {history.map((value, index) => (
            <span
              key={index}
              style={{
                padding: '6px 12px',
                backgroundColor: index === history.length - 1 ? '#007bff' : '#e9ecef',
                color: index === history.length - 1 ? 'white' : '#495057',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: index === history.length - 1 ? 'bold' : 'normal'
              }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* 설명 섹션 */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffc107'
      }}>
        <h3 style={{ marginTop: 0, color: '#856404' }}>💡 학습 포인트</h3>
        <ul style={{ color: '#856404', lineHeight: '1.8' }}>
          <li style={{textAlign: 'left'}}><strong>useAppDispatch</strong>: 액션을 디스패치하는 hook</li>
          <li style={{textAlign: 'left'}}><strong>useAppSelector</strong>: Redux 상태를 조회하는 hook</li>
          <li style={{textAlign: 'left'}}><strong>createSlice</strong>: 액션과 리듀서를 한 번에 정의</li>
          <li style={{textAlign: 'left'}}><strong>불변성</strong>: Immer를 통해 자동으로 불변성 유지</li>
        </ul>
      </div>
    </div>
  );
}
