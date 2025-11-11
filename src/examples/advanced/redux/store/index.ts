import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import cartReducer from './cartSlice';

/**
 * Redux Store 구성
 * - Redux Toolkit의 configureStore를 사용하여 스토어를 생성
 * - 자동으로 Redux DevTools Extension과 통합됨
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

/**
 * RootState 타입정의
 * - ReturnType 타입스크립트 유틸 이용, 매개변수는 함수타입, 리턴은 함수의 반환값
 * - redux 툴킷 useSelector에서 사용됨(~/store/hooks.ts)
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch 타입: 스토어의 dispatch 함수 타입
 * - useDispatch 의 제네릭 타입으로 전달됨(~/store/hooks.ts)
 */
export type AppDispatch = typeof store.dispatch;
