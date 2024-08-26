/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:typescript-sort-keys/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'prettier', 'simple-import-sort', 'sort-keys', 'jsx-a11y', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_.*?$',
        ignoreRestSiblings: false,
      },
    ],
    'no-console': 'warn',
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', 'tsx'] }], //allow jsx syntax in js files (for next.js project), should add ".ts" if typescript project
    'react/react-in-jsx-scope': 'off', // suppress errors for missing 'import React' in files
    'react/self-closing-comp': 'warn',
    semi: 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['off'], // disable default eslint sort-keys
    'sort-keys/sort-keys-fix': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: true }], // use sort-keys-fix for fixing
  },
};
