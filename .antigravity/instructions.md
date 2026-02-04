# MetaMen100 - System Instructions para Antigravity

## Contexto del Proyecto

MetaMen100 es un Sistema Operativo de Conducta y espejo bio-digital de alto rendimiento.
Es una aplicación de gamificación de hábitos con IA generativa que transforma la vida
de hombres en un protocolo de 100 días.

## Stack Tecnológico

- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript 5.4+ (modo estricto)
- **Estilos**: Tailwind CSS 3.4+
- **Base de Datos**: PostgreSQL via Supabase
- **Auth**: Supabase Auth
- **Pagos**: Stripe
- **IA Generativa**: Replicate API (SDXL)
- **State Management**: Zustand
- **Testing**: Vitest + Playwright

## Estructura de Carpetas

src/
├── app/                    # App Router pages
│   ├── (auth)/            # Grupo de rutas de auth
│   ├── (dashboard)/       # Grupo de rutas protegidas
│   └── api/               # API Routes (solo webhooks)
├── components/
│   ├── ui/                # Componentes base reutilizables
│   └── [domain]/          # Componentes por dominio
├── lib/
│   ├── core/              # Lógica de negocio PURA (sin I/O)
│   ├── supabase/          # Clientes de Supabase
│   └── utils/             # Utilidades generales
├── actions/               # Server Actions
├── hooks/                 # Custom React hooks
├── types/                 # Tipos TypeScript
└── styles/                # Estilos globales

## Reglas de Código OBLIGATORIAS

### TypeScript
1. NUNCA usar `any` - usar `unknown` y narrowing
2. Tipos explícitos en funciones exportadas
3. Usar `interface` para objetos, `type` para uniones/intersecciones
4. Importar tipos con `import type { }`

### Validación
1. TODOS los inputs validados con Zod en el servidor
2. Crear schemas reutilizables en `/lib/validations/`
3. Nunca confiar en datos del cliente

### Server Actions
1. Siempre verificar autenticación primero
2. Verificar ownership de recursos
3. Usar transacciones para operaciones multi-tabla
4. Retornar formato estándar: `{ success: boolean, data?: T, error?: string }`

### Componentes
1. Server Components por defecto
2. `'use client'` solo cuando sea necesario
3. Props con tipos explícitos
4. Composición sobre herencia

### Error Handling
1. Usar try/catch con errores tipados
2. Logging estructurado con contexto
3. Nunca exponer stack traces al cliente
4. Códigos de error consistentes

## Patrones de Código

### Server Action Example
```typescript
'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const inputSchema = z.object({
  taskId: z.string().uuid(),
});

export async function completeTask(input: unknown) {
  // 1. Validar input
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: 'VALIDATION_ERROR' };
  }

  // 2. Verificar auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'UNAUTHORIZED' };
  }

  // 3. Ejecutar lógica
  try {
    // ... lógica de negocio
    revalidatePath('/dashboard');
    return { success: true, data: result };
  } catch (error) {
    console.error('[completeTask]', error);
    return { success: false, error: 'INTERNAL_ERROR' };
  }
}
```

## Mecánicas del Sistema (Cuestionario1)

### Vectores
- AURA (aura_lvl): 1-13, Arquetipo Mental
- JAWLINE (face_lvl): 1-13, Arquetipo Cara
- WEALTH (wealth_lvl): 1-13, Arquetipo Productividad
- PHYSIQUE: muscle_lvl (1-13) + fat_lvl (13-1 inverso)
- ENV (env_lvl): 1-13, Progresión temporal

### Niveles (1-10 + 3 post-game)
1. Indigente → 2. Arrimado → 3. Alucín → 4. Chalán → 5. Godín
→ 6. Acomodado → 7. Pudiente → 8. Millonario → 9. Magnate → 10. Semi-Dios

### Sistema de Salud
- 10 corazones base (expandible a 13)
- -1 corazón si día < 80% completado
- +1 corazón por racha de 7 días
- 0 corazones = muerte del avatar

## Comandos Útiles

```bash
pnpm dev          # Desarrollo
pnpm build        # Build
pnpm lint         # Linting
pnpm type-check   # Type checking
pnpm test         # Unit tests
pnpm test:e2e     # E2E tests
pnpm db:generate  # Generar tipos de DB
```

## Antes de Generar Código

1. Lee los archivos relevantes en /docs
2. Verifica los tipos en /src/types
3. Sigue las convenciones existentes
4. Incluye manejo de errores completo
5. Incluye validación de inputs
