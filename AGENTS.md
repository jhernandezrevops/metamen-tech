# METAMEN100 - AGENTS.md

> **Documento de referencia para agentes de código AI**
> 
> Este documento contiene toda la información esencial para trabajar eficazmente en el proyecto METAMEN100.
> **Idioma principal:** Español (toda documentación y contenido en español)

---

## 1. Visión General del Proyecto

### 1.1 ¿Qué es METAMEN100?

METAMEN100 es un **Sistema Operativo de Conducta y espejo bio-digital de alto rendimiento para hombres**, que unifica las herramientas necesarias en un solo lugar y genera compromiso a través de un motor de vectores e IA generativa.

**Concepto Central:**
> "Traducir matemáticamente la disciplina diaria del mundo real en la evolución visual inmediata de un avatar, imponiendo consecuencias brutales de estatus y supervivencia a lo longo de un protocolo de 100 días."

### 1.2 Pilares Fundamentales

| Pilar | Descripción |
|-------|-------------|
| **Espejo Bio-Digital** | Cada acción real tiene impacto visual inmediato en el avatar digital |
| **Motor de Vectores** | 5 vectores matemáticos determinan la apariencia del avatar: AURA (Mental), JAWLINE (Cara), WEALTH (Productividad), PHYSIQUE (Físico), ENV (Entorno) |
| **Protocolo de 100 Días** | Arco narrativo de transformación con niveles 1-10, muerte y resurrección, semi-dios final |

### 1.3 Gamificación Core

- **Sistema de Salud:** 10 corazones, pérdida permanente de progreso físico
- **Judgement Night:** Evaluación diaria de cumplimiento
- **Economía BTC:** Bitcoins virtuales ganados con disciplina real
- **Sistema de Niveles:** 10 niveles evolutivos con arquetipos
- **Rachas:** Streaks de cumplimiento diario

---

## 2. Stack Tecnológico

### 2.1 Tecnologías Principales

| Capa | Tecnología | Versión |
|------|------------|---------|
| **Framework** | Next.js | 14.2+ |
| **Frontend** | React | 18.3+ |
| **Lenguaje** | TypeScript | 5.4+ |
| **Base de Datos** | PostgreSQL (Supabase) | 15+ |
| **ORM** | Prisma | 6.x |
| **Estilos** | Tailwind CSS | 3.4+ |
| **Animaciones** | Framer Motion | 11+ |
| **Estado** | Zustand | 4.5+ |
| **Forms** | React Hook Form + Zod | 7+ / 3+ |

### 2.2 Servicios Externos

| Servicio | Propósito |
|----------|-----------|
| **Supabase** | Auth, Database, Realtime, Storage |
| **Stripe** | Procesamiento de pagos y suscripciones |
| **Replicate/Gemini** | Generación de imágenes de avatar (IA) |
| **Inngest** | Queue, cron jobs, scheduling |
| **Resend** | Envío de emails |
| **Cloudflare R2** | Almacenamiento de imágenes de avatar |

### 2.3 Testing

| Tipo | Herramienta | Cobertura Objetivo |
|------|-------------|-------------------|
| Unit Tests | Vitest | ≥ 80% |
| Integration Tests | Vitest | ≥ 70% |
| E2E Tests | Playwright | 100% critical paths |
| Type Safety | TypeScript | End-to-end |

---

## 3. Estructura del Proyecto

### 3.1 Layout de Carpetas (Planificado)

```
metamen100/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── preview.yml
│   │   └── production.yml
│   ├── dependabot.yml
│   └── CODEOWNERS
│
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── docs/                          # Documentación completa del proyecto
│   ├── 00_RULES.md               # Reglas no negociables
│   ├── 00_TAREAS.md              # Lista de tareas por caja
│   ├── 01_PRD.md                 # Product Requirements Document
│   ├── 02_ADRs.md                # Architecture Decision Records
│   ├── 03_TECH_SPEC.md           # Especificación Técnica
│   ├── 04_Data_Model.md          # Modelo de Datos
│   ├── 05_GDD.md                 # Game Design Document
│   ├── 06_Content_Spec.md        # Especificación de Contenido
│   ├── 07_UI_UX_Spec.md          # Especificación UI/UX
│   ├── 08_Test_Plan.md           # Plan de Testing
│   ├── 09_SECURITY_SPEC.md       # Especificación de Seguridad
│   ├── 00_planning/
│   │   └── cajas/                # Desglose atómico por caja
│   │       ├── caja_0.0.0.md     # Caja 0: Setup inicial
│   │       ├── caja_1.0.0.md     # Caja 1: Documentación
│   │       ├── caja_2.0.0.md     # Caja 2: Infraestructura
│   │       └── ... (caja_3.0.0 a caja_13.0.0)
│   ├── 01_requirements/
│   ├── 02_architecture/
│   └── 03_database/
│
├── public/                        # Assets estáticos
│   ├── favicon.ico
│   ├── fonts/
│   └── images/
│
├── scripts/                       # Scripts de utilidad
│   ├── seed.ts
│   └── generate-types.ts
│
├── supabase/                      # Configuración Supabase
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/               # Grupo de rutas de auth
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Grupo de rutas del dashboard
│   │   │   ├── dashboard/
│   │   │   ├── tasks/
│   │   │   ├── store/
│   │   │   ├── tools/
│   │   │   └── layout.tsx
│   │   ├── api/                  # API Routes (webhooks)
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   └── replicate/
│   │   │   └── cron/
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes base (shadcn/ui)
│   │   ├── forms/                # Formularios reutilizables
│   │   ├── avatar/               # Componentes del avatar
│   │   ├── tasks/                # Componentes de tareas
│   │   ├── store/                # Componentes de tienda
│   │   └── layout/               # Layout components
│   │
│   ├── lib/                      # Utilidades y lógica
│   │   ├── core/                 # Lógica de negocio pura
│   │   ├── server/               # Server Actions
│   │   │   ├── auth/
│   │   │   ├── tasks/
│   │   │   ├── store/
│   │   │   ├── wallet/
│   │   │   └── profile/
│   │   ├── supabase/             # Cliente Supabase
│   │   ├── prisma/               # Cliente Prisma
│   │   └── utils/                # Utilidades generales
│   │
│   ├── hooks/                    # Custom React hooks
│   │
│   ├── stores/                   # Zustand stores
│   │   ├── useAvatarStore.ts
│   │   ├── useTaskStore.ts
│   │   ├── useWalletStore.ts
│   │   └── useUIStore.ts
│   │
│   ├── types/                    # Tipos TypeScript
│   │   ├── database.types.ts     # Tipos de Supabase
│   │   ├── api.types.ts
│   │   └── index.ts
│   │
│   └── styles/                   # Estilos globales
│       └── globals.css
│
├── prisma/
│   └── schema.prisma             # Schema de base de datos
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.js
├── prettier.config.js
└── .env.local                    # Variables de entorno (no commitear)
```

### 3.2 Convenciones de Nomenclatura

```yaml
# Archivos y Carpetas
Componentes React:        PascalCase     (ej: AvatarDisplay.tsx)
Hooks personalizados:     camelCase      (ej: useAvatarStore.ts)
Utilidades:               camelCase      (ej: formatDate.ts)
Server Actions:           camelCase      (ej: completeTask.ts)

# Base de Datos
Tablas:                   plural, lowercase   (users, avatar_states)
Columnas:                 snake_case          (created_at, user_id)
Primary Keys:             id (UUID v4)
Foreign Keys:             [tabla]_id          (user_id, avatar_id)
Timestamps:               created_at, updated_at (UTC with timezone)
Enums:                    PascalCase          (Status, PlanType)
Índices:                  idx_[tabla]_[columna]

# TypeScript
Interfaces:               PascalCase     (interface UserProfile)
Types:                    PascalCase     (type VectorType)
Enums:                    PascalCase     (enum TaskCategory)
```

---

## 4. Comandos de Desarrollo

### 4.1 Comandos Principales

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run dev:turbo        # Iniciar con Turbo (experimental)

# Build
npm run build            # Build de producción
npm run start            # Iniciar servidor de producción

# Type Checking
npm run type-check       # Verificar tipos sin emitir

# Linting y Formatting
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Corregir errores de ESLint
npm run format           # Formatear con Prettier
npm run format:check     # Verificar formato
```

### 4.2 Testing

```bash
# Unit e Integration Tests (Vitest)
npm run test             # Ejecutar tests en modo watch
npm run test:unit        # Ejecutar tests una vez
npm run test:coverage    # Tests con reporte de cobertura

# E2E Tests (Playwright)
npm run test:e2e         # Ejecutar tests E2E
npm run test:e2e:ui      # Ejecutar con interfaz gráfica
```

### 4.3 Base de Datos

```bash
# Supabase
npm run db:generate      # Generar tipos de TypeScript desde Supabase
npm run db:migrate       # Aplicar migraciones
npm run db:reset         # Resetear base de datos
npm run db:seed          # Poblar con datos de prueba
```

---

## 5. Guías de Desarrollo

### 5.1 Reglas No Negociables

1. **NUNCA inventar mecánicas** que no estén documentadas en `/docs/`
2. **PROHIBIDO** implementar alternativas sin consultar al usuario
3. **NO avanzar** a la siguiente tarea hasta completar la actual y recibir confirmación
4. Todo código debe seguir las especificaciones en `/docs/` - **esto no es negociable**
5. Calidad quirúrgica, no aproximada

### 5.2 Principios de Código

```yaml
Clean Code:
  - Funciones pequeñas (máx 20 líneas)
  - Nombres descriptivos y explícitos
  - Comentarios solo cuando la lógica no es obvia
  - Early returns para reducir anidación

TypeScript:
  - Tipado explícito en funciones públicas
  - No usar 'any'
  - Interfaces preferidas sobre types para objetos
  - Enums para valores discretos

React:
  - Server Components por defecto
  - 'use client' solo cuando sea necesario (interactividad)
  - Custom hooks para lógica reutilizable
  - Props destructuring con tipos explícitos

CSS/Tailwind:
  - Mobile-first responsive design
  - Clases de utilidad sobre CSS custom
  - Variables CSS para temas (colores, espaciado)
```

### 5.3 Arquitectura de Componentes

```typescript
// Ejemplo de estructura de componente

// 1. Imports (ordenados: React/Next → Librerías → Locales)
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAvatarStore } from '@/stores/useAvatarStore'
import { cn } from '@/lib/utils/cn'

// 2. Types/Interfaces
interface AvatarDisplayProps {
  userId: string
  size?: 'sm' | 'md' | 'lg'
  showLevel?: boolean
}

// 3. Componente
export function AvatarDisplay({ 
  userId, 
  size = 'md', 
  showLevel = true 
}: AvatarDisplayProps) {
  // 4. Hooks
  const { avatar, isLoading } = useAvatarStore()
  
  // 5. Early returns para estados de carga/error
  if (isLoading) return <AvatarSkeleton size={size} />
  if (!avatar) return <AvatarPlaceholder size={size} />
  
  // 6. Render
  return (
    <motion.div 
      className={cn('relative', sizeClasses[size])}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Contenido */}
    </motion.div>
  )
}

// 7. Helpers (al final o en archivo separado)
const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-32 h-32'
} as const
```

---

## 6. Sistema de Cajas (Metodología de Desarrollo)

### 6.1 ¿Qué son las Cajas?

El proyecto usa una metodología de desarrollo basada en "**cajas**" (milestones atómicos). Cada caja representa un conjunto coherente de funcionalidades que se desarrollan y completan antes de pasar a la siguiente.

### 6.2 Estructura de Cajas

| Caja | Nombre | Estado | Descripción |
|------|--------|--------|-------------|
| **00** | Setup Inicial | ✅ | Configuración inicial del proyecto |
| **01** | Documentación | ✅ | Toda la documentación del sistema |
| **02** | Infraestructura | 🔄 | Configuración técnica base |
| **03** | Autenticación | ⏳ | Sistema de login/registro |
| **04** | Onboarding | ⏳ | Flujo de bienvenida y configuración |
| **05** | Dashboard | ⏳ | Panel principal del usuario |
| **06** | Sistema de Tareas | ⏳ | Gestión de tareas diarias |
| **07** | Sistema de Vectores | ⏳ | Cálculo y visualización de vectores |
| **08** | Economía (Wallet) | ⏳ | Sistema de BTC y transacciones |
| **09** | Tienda | ⏳ | Catálogo y compras |
| **10** | Arsenal de Herramientas | ⏳ | 9 herramientas integradas |
| **11** | Sistema de Juicio | ⏳ | Judgement Night y salud |
| **12** | Generación de Avatar | ⏳ | Integración con IA |
| **13** | Perfil y Ajustes | ⏳ | Configuración de usuario |

### 6.3 Convención de Versionado

```
Formato: caja_X.Y.Z.md

X = Número de Caja (0-13)
Y = Sub-caja/Módulo (0-9)
Z = Revisión/Iteración (0-9)

Ejemplos:
- caja_1.0.0.md   # Caja 1, Sub-caja 0, Revisión 0
- caja_2.1.3.md   # Caja 2, Sub-caja 1, Revisión 3
```

### 6.4 Proceso de Trabajo

1. Antes de cualquier tarea, **preguntar**: "¿Qué caja de METAMEN100 estamos trabajando? (01-13)"
2. Consultar el archivo correspondiente en `docs/00_planning/cajas/`
3. Seguir el desglose atómico de tareas en el documento
4. Marcar tareas completadas en `docs/00_TAREAS.md`
5. **NO avanzar** a la siguiente caja sin confirmación

---

## 7. Variables de Entorno

### 7.1 Variables Requeridas (.env.local)

```bash
# ============================================
# SUPABASE
# ============================================
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_PROJECT_ID=

# Database URL para Prisma (connection pooling)
DATABASE_URL=
# Direct URL para migraciones (sin pooling)
DIRECT_URL=

# ============================================
# STRIPE
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# ============================================
# REPLICATE (AI Image Generation)
# ============================================
REPLICATE_API_TOKEN=

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=METAMEN100

# ============================================
# DEVELOPMENT ONLY
# ============================================
NODE_ENV=development
```

---

## 8. Seguridad

### 8.1 Principios de Seguridad

- **Security by Design:** Seguridad integrada desde el diseño
- **Zero Trust Architecture:** Nunca confiar, siempre verificar
- **RLS obligatorio:** Row Level Security en todas las tablas de usuario
- **No hay DELETE físico:** Solo soft delete (status/archived)
- **Validación en capas:** Frontend → API → Base de datos

### 8.2 Checklist de Seguridad

```yaml
Autenticación:
  - Usar Supabase Auth con PKCE
  - Verificación de teléfono obligatoria
  - Sesiones con tiempo de expiración
  - Rate limiting en endpoints de auth

Base de Datos:
  - RLS habilitado en todas las tablas
  - Políticas granulares por usuario
  - Service role solo para operaciones admin
  - Prepared statements (Prisma lo maneja)

API:
  - Validación de inputs con Zod
  - Rate limiting por IP y usuario
  - CORS configurado correctamente
  - Headers de seguridad (HSTS, CSP, etc.)

Frontend:
  - Sanitización de inputs
  - Protección contra XSS
  - CSRF tokens en forms
  - No exponer secrets en cliente
```

---

## 9. Testing

### 9.1 Estrategia de Testing

```
Pirámide de Testing:

                    ╱╲
                   ╱  ╲
                  ╱ E2E╲          ← 10% - Playwright
                 ╱  10% ╲            (Flujos críticos)
                ╱────────╲
               ╱          ╲
              ╱ Integration╲      ← 30% - Vitest
             ╱    30%      ╲         (API, DB, Services)
            ╱───────────────╲
           ╱                  ╲
          ╱    Unit Tests       ╲   ← 60% - Vitest
         ╱        60%            ╲      (Funciones, Components)
        ╱─────────────────────────╲
```

### 9.2 Objetivos de Cobertura

| Tipo | Cobertura Mínima |
|------|------------------|
| Unit Tests | ≥ 80% |
| Integration Tests | ≥ 70% |
| E2E Critical Paths | 100% |
| API Tests | 100% |

### 9.3 Métricas de Calidad

- Bugs críticos en producción: **0**
- Bugs mayores en producción: **≤ 2/mes**
- Tiempo de respuesta p95: **≤ 200ms**
- Uptime: **≥ 99.9%**
- Lighthouse Score: **≥ 90** en todas las categorías

---

## 10. Recursos Clave

### 10.1 Documentación Interna (obligatoria leer)

| Documento | Propósito |
|-----------|-----------|
| `docs/00_RULES.md` | Reglas no negociables del proyecto |
| `docs/00_TAREAS.md` | Lista completa de tareas por caja |
| `docs/01_PRD.md` | Requisitos del producto |
| `docs/02_ADRs.md` | Decisiones arquitectónicas |
| `docs/03_TECH_SPEC.md` | Especificación técnica completa |
| `docs/04_Data_Model.md` | Modelo de datos y esquema |
| `docs/05_GDD.md` | Diseño del sistema de juego |
| `docs/06_Content_Spec.md` | Contenido, tareas, tienda |
| `docs/07_UI_UX_Spec.md` | Sistema de diseño y UI |
| `docs/08_Test_Plan.md` | Estrategia de testing |
| `docs/09_SECURITY_SPEC.md` | Especificación de seguridad |

### 10.2 Enlaces Útiles

- **Stack:** Next.js 14, React 18, TypeScript 5, Tailwind 3, Supabase, Prisma
- **Design System:** Mobile-first, Dark theme (#0A0A0A), Acentos dorados
- **Target:** Hombres 20-35 años, México/LATAM/España

---

## 11. Contacto y Decisiones

### 11.1 Antes de Cualquier Cambio

Siempre consultar:
1. ¿Está documentado en `/docs/`?
2. ¿A qué caja pertenece esta funcionalidad?
3. ¿Hay ADR relacionado con esta decisión técnica?

### 11.2 Flujo de Trabajo Recomendado

```
1. Leer AGENTS.md (este archivo)
2. Identificar la caja actual
3. Consultar docs/00_TAREAS.md para tareas pendientes
4. Leer la caja específica en docs/00_planning/cajas/
5. Implementar siguiendo especificaciones
6. Verificar contra reglas en docs/00_RULES.md
7. Marcar tarea como completada
8. Confirmar con usuario antes de continuar
```

---

> **Última actualización:** Febrero 2026
> **Versión:** 1.0.0
> **Estado:** APROBADO PARA DESARROLLO
