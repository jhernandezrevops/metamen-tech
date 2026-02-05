# Core Business Logic

Lógica de negocio PURA sin I/O:

- `vectors.ts` - Cálculos de vectores (AURA, JAWLINE, WEALTH, PHYSIQUE, ENV)
- `levels.ts` - Cálculos de niveles 1-10
- `health.ts` - Lógica de salud (10 corazones)
- `streak.ts` - Lógica de racha diaria
- `judgement.ts` - Lógica de Judgement Night
- `death.ts` - Lógica de muerte y resurrección
- `economy.ts` - Cálculos de economía BTC
- `validations.ts` - Validaciones de negocio
- `constants.ts` - Constantes del sistema

## Principio

Estos archivos deben ser funciones puras que no dependan de APIs externas,
base de datos, o estado del cliente. Deben ser 100% testeables unitariamente.
