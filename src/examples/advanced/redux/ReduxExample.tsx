import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CounterExample from './components/CounterExample';
import ShoppingCartExample from './components/ShoppingCartExample';

/**
 * Redux 예제 메인 컴포넌트
 * - Redux Provider로 감싸서 하위 컴포넌트에서 Redux store에 접근할 수 있게 함
 */
export default function ReduxExample() {
  const [activeTab, setActiveTab] = useState<'counter' | 'cart'>('counter');

  return (
    <Provider store={store}>
      <div style={{ padding: '20px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>
            🔄 Redux Toolkit 학습 예제
          </h2>
          <p style={{ color: '#666', lineHeight: '1.6', textAlign: 'justify' }}>
            Redux Toolkit은 Redux를 더 쉽고 효율적으로 사용할 수 있도록 만든 공식 툴킷입니다.
            복잡한 보일러플레이트 코드를 줄이고, 모범 사례를 기본으로 제공합니다.
          </p>

          {/* 탭 메뉴 */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
            borderBottom: '2px solid #eee'
          }}>
            <button
              onClick={() => setActiveTab('counter')}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === 'counter' ? '#007bff' : 'transparent',
                color: activeTab === 'counter' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              📊 Counter 예제
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              style={{
                padding: '12px 24px',
                backgroundColor: activeTab === 'cart' ? '#007bff' : 'transparent',
                color: activeTab === 'cart' ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              🛒 Shopping Cart 예제
            </button>
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div>
          {activeTab === 'counter' && <CounterExample />}
          {activeTab === 'cart' && <ShoppingCartExample />}
        </div>

        {/* Redux Toolkit 소개 */}
        <div style={{
          marginTop: '30px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>📚 Redux Toolkit이란?</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#007bff' }}>주요 특징</h3>
            <ul style={{ lineHeight: '1.8', color: '#666' }}>
              <li style={{textAlign: 'left'}}><strong>간결한 코드</strong>: createSlice로 액션과 리듀서를 한 번에 정의</li>
              <li style={{textAlign: 'left'}}><strong>불변성 자동 처리</strong>: Immer 라이브러리를 내장하여 직관적인 코드 작성</li>
              <li style={{textAlign: 'left'}}><strong>TypeScript 지원</strong>: 타입 안정성을 위한 완벽한 TypeScript 지원</li>
              <li style={{textAlign: 'left'}}><strong>DevTools 통합</strong>: Redux DevTools Extension 자동 설정</li>
              <li style={{textAlign: 'left'}}><strong>모범 사례 기본 제공</strong>: Redux의 베스트 프랙티스가 기본으로 적용됨</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#007bff' }}>핵심 API</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              <div style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>configureStore</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  Redux 스토어를 간편하게 설정. 미들웨어와 DevTools를 자동 구성
                </p>
              </div>
              
              <div style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>createSlice</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  액션 생성자와 리듀서를 한 번에 생성하는 함수
                </p>
              </div>
              
              <div style={{
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>createAsyncThunk</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  비동기 작업을 위한 thunk 액션 생성자 (예제에서는 미사용)
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#007bff' }}>프로젝트 구조</h3>
            <pre style={{
              backgroundColor: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '14px',
              color: '#333',
              textAlign: 'left'
            }}>
{`src/examples/advanced/redux/
├── store/
│   ├── index.ts           # 스토어 설정
│   ├── hooks.ts           # 타입이 지정된 hooks
│   ├── counterSlice.ts    # Counter 슬라이스
│   └── cartSlice.ts       # Cart 슬라이스
├── components/
│   ├── CounterExample.tsx
│   └── ShoppingCartExample.tsx
└── ReduxExample.tsx       # 메인 컴포넌트`}
            </pre>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            border: '1px solid #bee5eb'
          }}>
            <h3 style={{ marginTop: 0, color: '#0c5460' }}>💡 학습 팁</h3>
            <ol style={{ color: '#0c5460', lineHeight: '1.8', marginBottom: 0 }}>
              <li style={{textAlign: 'left'}}>Redux DevTools Extension을 설치하여 상태 변화를 시각적으로 확인하세요</li>
              <li style={{textAlign: 'left'}}>createSlice의 reducers는 불변성을 신경 쓰지 않고 직접 수정할 수 있습니다</li>
              <li style={{textAlign: 'left'}}>useAppDispatch와 useAppSelector를 사용하여 타입 안정성을 확보하세요</li>
              <li style={{textAlign: 'left'}}>복잡한 상태 관리가 필요할 때 Redux를 고려하세요 (간단한 경우는 Context API로 충분)</li>
            </ol>
          </div>
        </div>
      </div>
    </Provider>
  );
}
