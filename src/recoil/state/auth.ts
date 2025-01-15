// src/state/authState.js
import {atom} from 'recoil';

export interface User {
  id: string;
  pw: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const authState = atom<AuthState>({
  key: 'authState', // 고유한 key
  default: {isAuthenticated: false, user: null}, // 초기 상태
});
