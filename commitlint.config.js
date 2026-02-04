module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    // Tipos permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nueva feature
        'fix', // Bug fix
        'docs', // Documentación
        'style', // Formato, no afecta código
        'refactor', // Refactoring
        'perf', // Performance
        'test', // Tests
        'build', // Build system
        'ci', // CI/CD
        'chore', // Mantenimiento
        'revert', // Revert
      ],
    ],

    // Longitud del subject
    'subject-max-length': [2, 'always', 72],

    // No punto al final del subject
    'subject-full-stop': [2, 'never', '.'],

    // Subject en lowercase
    'subject-case': [2, 'always', 'lower-case'],

    // Body máximo 100 chars por línea
    'body-max-line-length': [2, 'always', 100],
  },
};
