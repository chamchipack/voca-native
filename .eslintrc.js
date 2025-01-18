// .eslintrc.js (또는 eslint.config.js)
module.exports = {
  // 루트 설정(최상위 프로젝트 ESLint 설정)
  root: true,

  // 파서 설정 (TypeScript 구문 해석)
  parser: '@typescript-eslint/parser',

  // 확장하고 싶은 ESLint 구성들을 배열로 나열
  extends: [
    // 1) React Native 기본 ESLint 구성
    '@react-native',

    // 2) 기본 JS 추천 규칙
    'eslint:recommended',

    // 3) TypeScript 추천 규칙
    'plugin:@typescript-eslint/recommended',

    // 4) Prettier와 충돌나는 규칙 비활성화
    'prettier',

    // 5) Prettier를 ESLint에 통합해, 스타일 문제도 에러로 표시
    'plugin:prettier/recommended',
  ],

  // 사용할 플러그인들
  plugins: ['@typescript-eslint', 'prettier'],

  // 개별 규칙 커스터마이징
  rules: {
    // Prettier 포맷팅을 ESLint 에러로 보이게 함
    'prettier/prettier': 'error',
    // 필요하다면 ESLint/TS 규칙 추가 또는 덮어쓰기
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
