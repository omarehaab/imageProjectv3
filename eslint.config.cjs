const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      env: {
        browser: true,
        es2021: true,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        alert: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'warn',
      'no-undef': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
