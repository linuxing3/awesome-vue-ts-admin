module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
  rules: {
    'max-len': 'off',
    'new-cap': 'off',
    'no-continue': 'off',
    experimentalDecorators: 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-alert': 'off',
    radix: 'off',
    'array-callback-return': 'off',
    'no-case-declarations': 'off',
    'default-case': 'off',
    'no-plusplus': 'off',
    'guard-for-in': 'off',
    'prefer-destructuring': 'off',
    'prefer-promise-reject-errors': 'off',
    camelcase: 'off',
    'eslint-import-resolver-typescript': {
      extensions: ['.ts', '.tsx', '.d.ts'],
    },
    'space-infix-ops': 'off',
    'no-fallthrough': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 0,
    'no-restricted-globals': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    'import/named': 'off',
    'import/newline-after-import': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/html-end-tags': 'error',
    'vue/html-indent': ['error', 2],
    'vue/html-self-closing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/attributes-order': 'error',
    'vue/order-in-components': 'error',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
