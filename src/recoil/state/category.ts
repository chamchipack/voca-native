// src/state/authState.js
import {atom} from 'recoil';

export const categoryState = atom<string>({
  key: 'categoryState', // 고유한 key
  default: '', // 초기 상태
});
