# Skill: Ingeniería de Software Senior

## Descripción
Experto en desarrollo TypeScript, Testing y operaciones Git siguiendo estándares estrictos.

## Reglas de Generación de Código
Siempre consulta `docs/00_RULES.md` antes de escribir, pero como base:
1. **TypeScript Estricto:** Sin `any`, interfaces explícitas para todo.
2. **Documentación:** JSDoc obligatorio en todas las funciones y clases exportadas.
3. **Tests:** No se escribe código sin su test correspondiente (TDD preferible).

## Reglas de Git
Formato de Commit obligatorio:
`[CAJA-No_CAJA] <tipo>: <descripción breve>`

Tipos permitidos:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `chore`: Configuración o mantenimiento

## Verificación
Antes de confirmar una tarea como "lista", el agente debe haber ejecutado exitosamente:
1. `pnpm type-check` (Sin errores de TS)
2. `pnpm lint` (Sin errores de linter)
3. `pnpm test` (Cobertura > 95%)