module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true
    },
    ecmaVersion: 6,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'sort-keys-fix'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE']
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      }
    ],
    '@typescript-eslint/semi': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    curly: ['error', 'multi'],
    'newline-before-return': 'error',
    'no-extra-parens': 'error',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    radix: ['error', 'as-needed'],
    semi: [2, 'never'],
    'sort-imports': [
      2,
      { memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'] }
    ],
    'sort-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
    'space-before-function-paren': [
      'error', {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
      }
    ]
  }
}
