import { useState } from 'react';

/**
 * 카운터 기능을 제공하는 커스텀 훅
 */
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  const setValue = (value: number) => setCount(value);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  };
}
