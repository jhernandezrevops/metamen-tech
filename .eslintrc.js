module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
    '@typescript-eslint/strict-boolean-expressions': ['error', {
      allowString: false,
      allowNumber: false,
      allowNullableObject: true,
      allowNullableBoolean: true,
      allowNullableString: false,
      allowNullableNumber: false,
      allowAny: false,
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: {
        arguments: false,
        attributes: false,
      },
    }],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': ['error', {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
    }],
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-no-leaked-render': ['error', {
      validStrategies: ['ternary', 'coerce'],
    }],
    'react/react-in-jsx-scope': 'off',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],
        'index',
        'type',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: 'next/**',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'internal',
          position: 'before',
        },
      ],
      pathGroupsExcludedImportTypes: ['react', 'next'],
    }],
    'import/no-duplicates': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'no-console': ['warn', {
      allow: ['warn', 'error', 'info']
    }],
    'no-debugger': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.config.js', '*.config.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'coverage/',
    'playwright-report/',
    '*.config.js',
    'next-env.d.ts',
  ],
};
