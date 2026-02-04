# Server Actions

Puntos de entrada para mutaciones de datos desde el cliente.

## Reglas
1. Validar TODOS los inputs con Zod.
2. Verificar autenticación al inicio.
3. Manejar errores y retornar `ActionState`.
