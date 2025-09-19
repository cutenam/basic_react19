// 공통 타입 정의
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export type ExampleType = 
  | 'state' 
  | 'effect' 
  | 'actions' 
  | 'optimistic' 
  | 'custom-hooks';
