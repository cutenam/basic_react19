import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

/**
 * Counter state 타입 정의
 */
interface CounterState {
  value: number;
  history: number[];
}

/**
 * Counter state 초기값 세팅
 */
const initialState: CounterState = {
  value: 0,
  history: [0],
};

/**
 * Counter Slice
 * - Redux Toolkit의 createSlice를 사용하여 액션과 리듀서를 한 번에 정의
 *   A function that accepts an initial state, an object full of reducer functions,
 *   and a "slice name", and automatically generates action creators
 *   and action types that correspond to the reducers and state.
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 값을 1 증가시키는 액션
    increment: (state) => {
      state.value += 1;
      state.history.push(state.value);
    },
    // 값을 1 감소시키는 액션
    decrement: (state) => {
      state.value -= 1;
      state.history.push(state.value);
    },
    // 특정 값만큼 증가시키는 액션
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.history.push(state.value);
    },
    // 값을 0으로 초기화하는 액션
    reset: (state) => {
      state.value = 0;
      state.history = [0];
    },
  },
});

// 액션 생성자들을 export
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// 리듀서를 export
export default counterSlice.reducer;
