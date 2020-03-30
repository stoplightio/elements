module.exports = {
  extends: ['@stoplight'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-unused-expressions': 'off',
  },
};
