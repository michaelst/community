module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: ['error', 'never'],
    curly: ['error', 'multi-line'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/semi': 'off',
    'no-unexpected-multiline': 'error',
    'eslint-comments/no-unlimited-disable': 'off'
  }
}
