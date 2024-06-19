module.exports = {
  extends: ['@stoplight', 'plugin:storybook/recommended'],
  plugins: ['jest'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['lodash/*', '@fortawesome/free-solid-svg-icons/*'],
      },
    ],
    'jest/no-truthy-falsy': 'off',
  },
};
