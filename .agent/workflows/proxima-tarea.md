---
description: Flujo para implementar tarea
---

name: proxima_tarea
description: Analiza la siguiente tarea pendiente, planifica, implementa, valida y hace commit.
triggers:
  - description: Cuando el usuario quiera avanzar con la siguiente tarea del proyecto.
    user_commands: ["proxima_tarea", "siguiente tarea", "next task"]

steps:
  - id: cargar_contexto_reglas
    description: Cargar las reglas maestras del proyecto.
    action: read_file
    files: ["docs/00_RULES.md"]

  - id: analisis_tareas
    description: Localizar la siguiente tarea pendiente en el tracker.
    uses: skills/gestion_proyecto.md
    instruction: |
      Analiza el archivo "docs/00_TAREAS.md".
      1. Busca la primera fila donde la columna "CHECKBOX" esté vacía o no marcada.
      2. Extrae el "No_CAJA" y el "ID_TAREA".
      3. Localiza el archivo de la caja correspondiente en "docs/00_planning/cajas/".
      4. Lee el archivo de la caja y extrae los detalles específicos del "ID_TAREA".

  - id: planificacion_y_confirmacion
    description: Generar el plan de acción y solicitar aprobación.
    uses: skills/ingenieria_software.md
    instruction: |
      Basado en la tarea identificada y las reglas de "00_RULES.md":
      1. Lista los archivos a crear/modificar.
      2. Lista los procesos a ejecutar.
      3. Define el orden de implementación y dependencias.
      
      IMPORTANTE: Al final de este paso, muestra el mensaje: 
      "Proxima tarea a ejecutar localizada, tarea [ID] lista para su ejecucion. ¿Procedo?"
      y DETÉN la ejecución hasta que el usuario confirme.

  - id: implementacion_codigo
    description: Generar el código una vez confirmado por el usuario.
    uses: skills/ingenieria_software.md
    instruction: |
      Si el usuario confirma:
      Genera el código necesario siguiendo estrictamente:
      - TypeScript estricto.
      - JSDoc completo.
      - Tests unitarios incluidos (Vitest/Jest según stack).
      Asegúrate de no romper funcionalidades existentes.

  - id: validacion_calidad
    description: Verificar calidad del código antes del commit.
    action: execute_terminal
    command: |
      pnpm type-check && pnpm lint && pnpm test:coverage
    stop_on_error: true

  - id: control_versiones
    description: Realizar commit y push si las pruebas pasan.
    uses: skills/ingenieria_software.md
    instruction: |
      Si la validación anterior (paso 5) fue exitosa (exit code 0):
      1. Ejecuta: git add -A
      2. Ejecuta: git commit -m "[CAJA-X.X.X] <tipo>: <descripción de la tarea>"
      3. Ejecuta: git push origin
      4. Genera el informe final: "Tarea [ID] completada exitosamente."