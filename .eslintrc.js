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

  plugins: ['@typescript-eslint', 'import'],

  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },

  rules: {
    // ========================================
    // TypeScript Estricto
    // ========================================

    // Prohibir 'any' explícito
    '@typescript-eslint/no-explicit-any': 'error',

    // Requerir tipos de retorno explícitos en funciones exportadas
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],

    // Requerir tipos de retorno en métodos de módulo
    '@typescript-eslint/explicit-module-boundary-types': 'warn',

    // No variables sin usar (excepto las que empiezan con _)
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // Expresiones booleanas estrictas
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    // No promesas flotantes
    '@typescript-eslint/no-floating-promises': 'error',

    // Await solo en thenables
    '@typescript-eslint/await-thenable': 'error',

    // No mal uso de promesas
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],

    // Preferir nullish coalescing
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    // Preferir optional chaining
    '@typescript-eslint/prefer-optional-chain': 'error',

    // No non-null assertion innecesaria
    '@typescript-eslint/no-unnecessary-condition': 'warn',

    // Consistencia en type vs interface
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Importar tipos como type imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      },
    ],

    // ========================================
    // React
    // ========================================

    // Dependencias de useEffect completas
    'react-hooks/exhaustive-deps': 'error',

    // No renderizado con leak
    'react/jsx-no-leaked-render': [
      'error',
      {
        validStrategies: ['ternary', 'coerce'],
      },
    ],

    // Sin React en scope (Next.js lo inyecta)
    'react/react-in-jsx-scope': 'off',

    // Props en orden alfabético (opcional pero ordenado)
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],

    // ========================================
    // Imports
    // ========================================

    // Orden de imports
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node builtins (fs, path)
          'external', // npm packages
          'internal', // @ alias imports
          ['parent', 'sibling'], // relative imports
          'index',
          'type', // type imports last
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
      },
    ],

    // No imports duplicados
    'import/no-duplicates': 'error',

    // ========================================
    // Seguridad
    // ========================================

    // Prohibir eval
    'no-eval': 'error',

    // Prohibir implied eval
    'no-implied-eval': 'error',

    // Prohibir new Function
    'no-new-func': 'error',

    // ========================================
    // Estilo General
    // ========================================

    // Preferir const sobre let
    'prefer-const': 'error',

    // No var
    'no-var': 'error',

    // Preferir template literals
    'prefer-template': 'error',

    // Usar === en lugar de ==
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // No console en producción
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // No debugger
    'no-debugger': 'error',
  },

  // Overrides para archivos específicos
  overrides: [
    // Tests pueden usar any
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    // Scripts pueden usar console
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    // Config files son CommonJS
    {
      files: ['*.config.js', '*.config.ts', '.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    // Archivos generados (Supabase Types)
    {
      files: ['src/types/database.types.ts'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // Supabase a menudo genera anys en Json types
      },
    },
  ],

  // Archivos a ignorar
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'coverage/',
    'playwright-report/',
    'next-env.d.ts',
  ],
};
