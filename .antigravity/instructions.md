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

```
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
```

## Principios de Desarrollo

### 1. Código Quirúrgico
- Funciones pequeñas (máximo 20 líneas)
- Nombres descriptivos y explícitos
- Comentarios solo cuando la lógica no es obvia
- Early returns para reducir anidación

### 2. TypeScript Estricto
- Tipado explícito en funciones públicas
- No usar 'any'
- Interfaces preferidas sobre types para objetos
- Enums para valores discretos

### 3. Server Components por Defecto
- 'use client' solo cuando sea necesario (interactividad)
- Custom hooks para lógica reutilizable
- Props destructuring con tipos explícitos

### 4. Tailwind CSS
- Mobile-first responsive design
- Clases de utilidad sobre CSS custom
- Variables CSS para temas (colores, espaciado)

## Gamificación Core

### 5 Vectores
1. **AURA**: Mental (claridad, enfoque)
2. **JAWLINE**: Cara (presencia, comunicación)
3. **WEALTH**: Productividad (disciplina, resultados)
4. **PHYSIQUE**: Físico (salud, vitalidad)
5. **ENV**: Entorno (relaciones, espacio)

### Sistema de Niveles
- 10 niveles evolutivos (1-10)
- Nivel 10: Semi-Dios
- Muerte y resurrección en el camino

### Economía
- **BTC Virtual**: Bitcoins ganados con disciplina real
- **Tienda**: Compra de boosters y cosméticos
- **Wallet**: Gestión de activos

## Reglas No Negociables

1. **NUNCA** inventar mecánicas no documentadas en `/docs/`
2. **PROHIBIDO** implementar alternativas sin consultar
3. **NO** avanzar a siguiente tarea sin completar la actual
4. Todo código debe seguir especificaciones en `/docs/`

## Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Iniciar servidor de desarrollo
pnpm type-check       # Verificar tipos
pnpm lint             # Linting
pnpm test             # Tests unitarios

# Base de datos
pnpm db:seed          # Seed de datos
pnpm db:generate      # Generar tipos de Supabase

# Build
pnpm build            # Build de producción
```

## Contacto y Decisiones

Antes de cualquier cambio arquitectónico, consultar documentación en `/docs/`.
Las decisiones técnicas deben estar respaldadas por ADRs (Architecture Decision Records).
