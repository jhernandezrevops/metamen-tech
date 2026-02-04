# MetaMen100: Estructura del Proyecto V2.0

Este proyecto sigue una arquitectura estricta "Feature-First" combinada con "Layered Architecture".

## Árbol de Directorios

```
src/
├── app/                    # Next.js App Router (Rutas)
│   ├── (marketing)/        # Landing y páginas públicas
│   ├── (auth)/             # Login, Register, Forgot Password
│   ├── (dashboard)/        # Aplicación principal protegida
│   └── api/                # Route Handlers (Webhooks, etc.)
│
├── actions/                # Server Actions (Lógica de mutación)
│   ├── auth/               # Acciones de autenticación
│   ├── tasks/              # Gestión de tareas
│   └── ...                 # Agrupado por dominio
│
├── components/             # Componentes React
│   ├── ui/                 # Shadcn/ui primitivos reutilizables
│   ├── layout/             # Header, Sidebar, Footer
│   ├── dashboard/          # Componentes específicos del dashboard
│   └── ...                 # Agrupado por dominio
│
├── lib/                    # Lógica de Negocio y Utilidades
│   ├── core/               # DOMINIO PURO (Reglas de juego, cálculos)
│   ├── supabase/           # Clientes de base de datos
│   ├── validations/        # Schemas de Zod
│   └── utils/              # Helpers genéricos
│
├── hooks/                  # Custom React Hooks
├── stores/                 # Estado Global (Zustand)
├── types/                  # Definiciones de Tipos TypeScript
└── styles/                 # Configuración de estilos globales
```

## Reglas de Colocación

1. **Lógica de Negocio Pura**: Va en `src/lib/core`. Funciones puras, testables unitariamente.
2. **Acceso a Datos**: Va en `src/actions` (escritura) o `src/lib/supabase` (lectura directa).
3. **Estado Cliente**: Va en `src/stores` (global) o `src/hooks` (local/reutilizable).
4. **Validación**: Todo input se valida con schemas en `src/lib/validations`.

## Estándares

- **Nombres de Archivos**: `kebab-case.ts` / `kebab-case.tsx`
- **Componentes**: `PascalCase.tsx` puede usarse si es preferencia, pero mantenemos consistencia.
- **Barrel Files**: Usar `index.ts` para exportar API pública de cada módulo.
