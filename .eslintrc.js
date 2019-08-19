'use strict';

module.exports = {
  root: true,
  extends: ['@codility/eslint-config-codility'],
  globals: {
    document: true,
    requestAnimationFrame: true,
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
