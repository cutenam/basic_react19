# Redux Toolkit 학습 예제

React에서 Redux Toolkit을 사용한 상태 관리 학습을 위한 예제입니다.

## 📁 프로젝트 구조

```
redux/
├── store/
│   ├── index.ts           # Redux 스토어 설정
│   ├── hooks.ts           # 타입이 지정된 useAppDispatch, useAppSelector
│   ├── counterSlice.ts    # Counter 기능 슬라이스
│   └── cartSlice.ts       # Shopping Cart 기능 슬라이스
├── components/
│   ├── CounterExample.tsx       # Counter 예제 컴포넌트
│   └── ShoppingCartExample.tsx  # Shopping Cart 예제 컴포넌트
└── ReduxExample.tsx       # 메인 예제 컴포넌트 (Provider 포함)            
```

## 🎯 학습 목표

### 1. Redux Toolkit 핵심 개념
- **configureStore**: Redux 스토어를 간편하게 설정
- **createSlice**: 액션과 리듀서를 한 번에 정의
- **Redux DevTools**: 자동으로 통합되는 디버깅 도구
- **Immer**: 불변성을 자동으로 처리하는 내장 라이브러리

### 2. TypeScript와 Redux
- RootState와 AppDispatch 타입 정의
- 타입이 지정된 useAppDispatch, useAppSelector 훅
- PayloadAction을 통한 타입 안전한 액션

## 📚 예제 설명

### Counter 예제 (counterSlice.ts)
간단한 카운터 기능을 통해 Redux의 기본을 학습합니다.

**주요 기능:**
- `increment`: 값을 1 증가
- `decrement`: 값을 1 감소
- `incrementByAmount`: 특정 값만큼 증가
- `reset`: 값을 0으로 초기화
- 변경 히스토리 추적

**학습 포인트:**
```typescript
// createSlice로 액션과 리듀서를 한 번에 정의
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Immer 덕분에 직접 수정 가능 (실제로는 불변성 유지)
      state.value += 1;
    },
    // PayloadAction으로 타입 안전한 액션
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
```

### Shopping Cart 예제 (cartSlice.ts)
실제 프로젝트에서 사용되는 복잡한 상태 관리를 학습합니다.

**주요 기능:**
- `addToCart`: 장바구니에 상품 추가 (중복 처리 포함)
- `removeFromCart`: 장바구니에서 상품 제거
- `increaseQuantity`: 상품 수량 증가
- `decreaseQuantity`: 상품 수량 감소
- `clearCart`: 장바구니 비우기
- 총 금액과 총 상품 수 자동 계산

**학습 포인트:**
```typescript
// 복잡한 상태 업데이트도 직관적으로 작성
addToCart: (state, action: PayloadAction<Product>) => {
  const existingItem = state.items.find(item => item.id === action.payload.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }
  
  calculateTotals(state);
},
```

## 🔧 설정 방법

### 1. 패키지 설치
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. 스토어 생성 (store/index.ts)
```typescript
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3. Provider로 감싸기
```typescript
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <YourComponent />
    </Provider>
  );
}
```

### 4. 컴포넌트에서 사용
```typescript
import { useAppDispatch, useAppSelector } from './store/hooks';
import { increment } from './store/counterSlice';

function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  
  return (
    <button onClick={() => dispatch(increment())}>
      Count: {count}
    </button>
  );
}
```

## 💡 Redux vs Context API

### Redux를 사용해야 하는 경우
- ✅ 전역 상태가 복잡하고 많은 경우
- ✅ 상태 변경 로직이 복잡한 경우
- ✅ 시간 여행 디버깅이 필요한 경우
- ✅ 미들웨어가 필요한 경우 (비동기 처리 등)
- ✅ 여러 컴포넌트에서 동일한 상태를 자주 업데이트하는 경우

### Context API를 사용해야 하는 경우
- ✅ 전역 상태가 간단한 경우 (테마, 언어 설정 등)
- ✅ 상태 변경이 자주 일어나지 않는 경우
- ✅ prop drilling을 피하고 싶은 경우
- ✅ 작은 규모의 프로젝트

## 🛠️ Redux DevTools 사용법

1. **브라우저 확장 프로그램 설치**
   - Chrome: Redux DevTools Extension
   - Firefox: Redux DevTools Extension

2. **개발자 도구에서 Redux 탭 열기**
   - 모든 액션 기록 확인
   - 상태 변화 추적
   - 시간 여행 디버깅 (액션 되돌리기/재실행)

3. **주요 기능**
   - Action 탭: 디스패치된 모든 액션 목록
   - State 탭: 현재 Redux 상태
   - Diff 탭: 상태 변경 차이점
   - Trace 탭: 액션이 디스패치된 위치

## 📖 추가 학습 자료

### Redux Toolkit 공식 문서
- [Redux Toolkit 소개](https://redux-toolkit.js.org/)
- [createSlice API](https://redux-toolkit.js.org/api/createSlice)
- [TypeScript Quick Start](https://redux-toolkit.js.org/tutorials/typescript)

### 고급 주제
- **createAsyncThunk**: 비동기 작업 처리
- **RTK Query**: API 호출 및 캐싱
- **Redux Middleware**: 커스텀 미들웨어 작성
- **Redux Persist**: 상태 영속화

## ⚠️ 주의사항

1. **리듀서에서 직접 수정 가능 (Immer 덕분)**
   ```typescript
   // ✅ Redux Toolkit에서는 가능
   state.value += 1;
   
   // ❌ 일반 Redux에서는 불가능 (새 객체 반환 필요)
   return { ...state, value: state.value + 1 };
   ```

2. **비동기 로직은 createAsyncThunk 사용**
   - reducer에 비동기 로직을 직접 작성하지 말 것

3. **성능 최적화**
   - useSelector는 참조 동등성 검사를 함
   - 필요한 상태만 선택하기
   - 복잡한 계산은 useMemo 사용

4. **슬라이스 분리**
   - 기능별로 슬라이스를 나누기
   - 너무 큰 슬라이스는 유지보수가 어려움

## 🎓 학습 순서 추천

1. **Counter 예제로 기본 학습**
   - Redux Toolkit의 기본 개념 이해
   - createSlice 사용법 익히기
   - Redux DevTools로 상태 변화 확인

2. **Shopping Cart 예제로 실전 연습**
   - 복잡한 상태 관리 경험
   - 배열과 객체 업데이트 연습
   - 계산된 값 관리 방법 학습

3. **직접 프로젝트에 적용**
   - Todo 앱 만들어보기
   - 사용자 관리 시스템 구현
   - API 연동 (createAsyncThunk 사용)

## 🚀 다음 단계

Redux Toolkit의 기본을 익혔다면:
- **RTK Query** 학습: API 호출과 캐싱을 자동화
- **Redux Middleware** 학습: 로깅, 인증 등의 공통 로직 추가
- **Redux Persist** 학습: 브라우저 스토리지에 상태 저장
- **Reselect** 학습: 메모이제이션된 selector 만들기
