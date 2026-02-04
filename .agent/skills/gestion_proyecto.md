# Skill: Gestión de Proyecto Metamen100

## Descripción
Experto en navegar la estructura de documentación del proyecto Metamen100, específicamente interpretando tablas de progreso y archivos de "Cajas".

## Capacidades

### 1. Análisis de Progreso (00_TAREAS.md)
Cuando debas buscar la "próxima tarea", sigue este algoritmo:
1. Lee el archivo `docs/00_TAREAS.md`.
2. Parsea la tabla Markdown.
3. Itera filas de arriba a abajo.
4. La primera fila donde la columna `CHECKBOX` esté vacía `[ ]` o `( )` es la tarea activa.
5. Retorna: `No_CAJA` y `ID_TAREA`.

### 2. Recuperación de Especificaciones (Cajas)
Una vez tengas el `No_CAJA` (ej: "1.0.0" o "2.1.0"):
1. Construye la ruta: `docs/00_planning/cajas/caja_[No_CAJA].md`.
2. Lee ese archivo.
3. Busca la sección que contenga el `ID_TAREA` exacto.
4. Extrae todo el contexto, criterios de aceptación y detalles técnicos de esa sección.