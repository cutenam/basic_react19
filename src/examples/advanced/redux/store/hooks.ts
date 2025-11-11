import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * useDispatch hook 을 통해 dispatch 함수를 리턴함
 * - useDispatch : Redux 스토어에서 dispatch 함수를 리턴함
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * useSelector hook
 * - 스토어의 state에 접근가능한 훅. 매개변수로 함수를 받음, 스토어 state 를 가지고 호출됨, 선택된 state 리턴함
 *
 * TypedUseSelectorHook 인터페이스
 * - RootState 타입을 자동으로 추론해주는 훅 인터페이스 : store.getState 의 반환값
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
