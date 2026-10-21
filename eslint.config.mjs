import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/coverage', '**/dist', '**/.cache-loader', '**/node_modules', '**/.yalc'],
  },

  react.configs.flat.recommended,
  prettierConfig,
  ...storybook.configs['flat/recommended'],

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
      jest,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      prettier,
      import: importPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'prettier/prettier': 'error',

      // Base
      'no-unused-expressions': 'off',
      'no-console': 'off',
      'no-confusing-arrow': 'off',
      'no-else-return': 'off',
      'no-return-assign': ['error', 'except-parens'],
      'no-underscore-dangle': 'off',
      camelcase: 'off',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'class-methods-use-this': 'off',
      'no-restricted-syntax': 'off',
      'no-param-reassign': ['error', { props: false }],
      'arrow-body-style': 'off',
      'arrow-parens': 'off',
      'no-unused-vars': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['lodash/*', '@fortawesome/free-solid-svg-icons/*'],
        },
      ],

      // Imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'warn',
      'sort-imports': 'off',
      'import/order': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Typescript
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],

      // React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',
      'react/no-multi-comp': 'off',
      'react/jsx-filename-extension': 'off',
      'react/no-unescaped-entities': 'off',
      'react/destructuring-assignment': 'off',
      'react/display-name': 'off',

      // Tests
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/consistent-test-it': 'error',
    },
  },
];
