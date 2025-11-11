import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

/**
 * 상품 타입
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

/**
 * 장바구니 아이템 타입
 * - Product 타입 상속
 * - 개수
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * 장바구니 state 타입
 * - 장바구니 아이템 타입 포함
 * - 총 금액, 개수
 */
interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

/**
 * 장바구니 초기 상태
 */
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

/**
 * calculateTotals
 * - 장바구니 아이템 총개수, 금액 계산
 * - 배열의 reduce 메서드 사용
 */
const calculateTotals = (state: CartState) => {
  state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Cart Slice
 * - 장바구니 기능을 구현한 Redux 슬라이스
 * - 사용자 액션에 따른 Reducer 구현
 * - 장바구니 아이템의 총 개수, 금액 계산
 *
 * Reducer
 * - addToCart : 장바구니에 상품 추가
 * - removeFromCart : 장바구니에서 상품 제거
 * - increaseQuantity : 상품 수량 증가
 * - decreaseQuantity : 상품 수량 감소
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 장바구니에 상품 추가
    addToCart: (state, action: PayloadAction<Product>) => {
      // 현재 장바구니에 존재하는 상품인지 확인(일치하는 요소 또는 undefined)
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // 이미 존재하는 상품이면 수량만 증가
        existingItem.quantity += 1;
      } else {
        // 새로운 상품이면 장바구니에 추가
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // 장바구니 아이템의 총 개수, 금액 계산
      calculateTotals(state);
    },
    
    // 장바구니에서 상품 제거
    removeFromCart: (state, action: PayloadAction<number>) => {
      // 제거할 상품 외의 아이템을 새로운 배열로 리턴 (filter)
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    
    // 상품 수량 증가
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        calculateTotals(state);
      }
    },
    
    // 상품 수량 감소
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      // 1보다 큰 경우만 연산, 그 외의 경우는 아무 처리도 하지 않음
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        calculateTotals(state);
      }
    },
    
    // 장바구니 비우기
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
