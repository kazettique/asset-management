module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint-config-next',
    'plugin:typescript-sort-keys/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'simple-import-sort', 'sort-keys'],
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys': ['off'], // disable default eslint sort-keys
    'sort-keys/sort-keys-fix': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: true }], // use sort-keys-fix for fixing
  },
};
