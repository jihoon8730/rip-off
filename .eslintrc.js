module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'expo',          // expo 커뮤니티 권장 설정
    'prettier'       // prettier 충돌 해소
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    'react-native/react-native': true,
    es6: true,
  },
  plugins: [
    'react',
    'react-native',
    'prettier'
  ],
  rules: {
    // Prettier 포맷팅 에러는 ESLint 에러로 표시
    'prettier/prettier': 'error',

    // 예: PropTypes를 사용하지 않는다면 off
    'react/prop-types': 'off',
    // React Native 스타일 미사용 경고
    'react-native/no-unused-styles': 'warn',
    // 필요에 따라 추가 커스텀 룰
  },
  settings: {
    react: { version: 'detect' },
  },
};
