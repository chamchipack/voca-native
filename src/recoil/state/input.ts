// src/state/authState.js
import {atom} from 'recoil';

// type Input = {
//   ko?: string;
//   ro?: string;
//   jp?: string;
//   kana?: string;
// };
export const inputState = atom<string>({
  key: 'inputState', // 고유한 key
  default: '', // 초기 상태
});
