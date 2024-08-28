module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      'eslint-import-resolver-custom-alias': {
        alias: {
          assets: './src/assets',
        },
      },
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js'] }],
    'import/no-unresolved': [2, { caseSensitive: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'lines-between-class-members': 'off',
    'default-param-last': 'off',
    'prefer-template': 'off',
  },
  overrides: [
    {
      files: ['./src/store/slices/*.ts'],
      rules: {
        'no-param-reassign': 'off',
        'no-use-before-define': 'off',
      },
    },
    {
      files: ['./src/components/Forms/**/*.tsx'],
      rules: {
        'consistent-return': 'off',
        'react/jsx-props-no-spreading': 'off',
        quotes: 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules', 'build'],
};
