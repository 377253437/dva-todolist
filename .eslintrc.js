module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      '@sc/eslint-config-sensorsdata-react',
      '@sc/eslint-config-sensorsdata-typescript/react',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      project: ['./tsconfig.json'],
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    rules: {
      'init-declarations': 'off',
      'require-jsdoc': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/init-declarations': ['error'],
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: {
          camelcase: 'off',
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': ['error'],
        },
      },
    ],
  };