'use strict';

module.exports = {
  root: true,
  extends: ['@codility/eslint-config-codility'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  globals: {
    document: true,
    localStorage: true,
    requestAnimationFrame: true,
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'webpack.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
