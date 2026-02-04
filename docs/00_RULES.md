# Reglas No Negociables

# ============================================
# REGLA 1: CONTEXTO DEL PROYECTO
# ============================================
name: "METAMEN100 - Contexto del Proyecto"
description: "Siempre mantener el contexto completo del sistema TOP 100"

rule: |
  Antes de cualquier respuesta relacionada con código:
  1. Recuerda que estás trabajando en METAMEN100
  2. Es un Sistema Operativo de Conducta de nivel TOP 100 Mundial
  3. La calidad debe ser quirúrgica, no aproximada
  4. Todo código debe seguir las especificaciones en /docs/ esto no es negociable
  
  REGLAS NO NEGOCIABLES:
  1. NUNCA Inventar o incorporar mecanicas que no se encuentren en /docs/
  2. PROHIBIDO implementar alternativas sin consultar al usuario
  3. No avanzar a la siguiente tarea hasta completar la actual y recibir confirmacion del usuario
  
  Si el usuario no especifica una caja, pregunta:
  "¿Qué caja o de METAMEN100 estamos trabajando? (01-13)"

# ============================================
# REGLA 2: STACK TECNOLÓGICO
# ============================================
name: "Stack Tecnológico Obligatorio"
description: "Tecnologías aprobadas en ADRs"

rule: |
  Tecnologías permitidas para METAMEN100:
  - Frontend: Next.js 14.2+, React 18.3+, TypeScript 5.4+
  - Backend: Supabase (PostgreSQL, Auth, Realtime)
  - Estilos: Tailwind CSS 3.4+, Framer Motion 11+
  - Estado: Zustand 4.5+
  - Forms: React Hook Form 7+ + Zod 3+
  - Testing: Vitest + Playwright
  - Pagos: Stripe
  - IA: Replicate API / Gemini 3 Pro Image
  
  PROHIBIDO sugerir alternativas sin consultar ADR-001 a ADR-013

# ============================================
# REGLA 3: ESTRUCTURA DE CARPETAS
# ============================================
name: "Estructura de Carpetas V2.0"
description: "Layout obligatorio del proyecto"

Árbol de Directorios Definitivo
Estructura Completa del Proyecto

metamen100/
  │
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
  ├── .antigravity/
  │   └── instructions.md
  │
  ├── docs/
  │   ├── 01_PRD.md
  │   ├── 02_ADRs.md
  │   ├── 03_TECH_SPEC.md
  │   ├── 04_DATA_MODEL.md
  │   ├── 05_GDD.md
  │   ├── 06_CONTENT.md
  │   ├── 07_UIUX.md
  │   ├── 08_TEST_PLAN.md
  │   ├── 09_SECURITY.md
  │   └── SETUP_GUIDE.md
  │
  ├── public/
  │   ├── favicon.ico
  │   ├── fonts/
  │   │   ├── Inter-Variable.woff2
  │   │   └── JetBrainsMono-Variable.woff2
  │   └── images/
  │       ├── logo.svg
  │       └── og-image.png
  │
  ├── scripts/
  │   ├── seed.ts
  │   └── generate-types.ts
  │
  ├── supabase/
  │   ├── migrations/
  │   │   └── 00000000000000_init.sql
  │   ├── seed.sql
  │   └── config.toml
  │
  ├── src/
  │   │
  │   ├── app/
  │   │   ├── layout.tsx                 # Root layout
  │   │   ├── page.tsx                   # Landing page
  │   │   ├── loading.tsx                # Global loading
  │   │   ├── error.tsx                  # Global error
  │   │   ├── not-found.tsx              # 404 page
  │   │   ├── globals.css                # Estilos globales
  │   │   │
  │   │   ├── (marketing)/               # Grupo: páginas públicas
  │   │   │   ├── layout.tsx
  │   │   │   ├── pricing/
  │   │   │   │   └── page.tsx
  │   │   │   └── about/
  │   │   │       └── page.tsx
  │   │   │
  │   │   ├── (auth)/                    # Grupo: autenticación
  │   │   │   ├── layout.tsx
  │   │   │   ├── login/
  │   │   │   │   └── page.tsx
  │   │   │   ├── register/
  │   │   │   │   └── page.tsx
  │   │   │   ├── forgot-password/
  │   │   │   │   └── page.tsx
  │   │   │   └── auth/
  │   │   │       └── callback/
  │   │   │           └── route.ts       # OAuth callback
  │   │   │
  │   │   ├── (onboarding)/              # Grupo: onboarding
  │   │   │   ├── layout.tsx
  │   │   │   └── onboarding/
  │   │   │       └── page.tsx
  │   │   │
  │   │   ├── (dashboard)/               # Grupo: app principal (protegido)
  │   │   │   ├── layout.tsx
  │   │   │   │
  │   │   │   ├── dashboard/
  │   │   │   │   ├── page.tsx           # Dashboard principal
  │   │   │   │   ├── loading.tsx
  │   │   │   │   │
  │   │   │   │   ├── tasks/
  │   │   │   │   │   └── page.tsx       # Tareas del día
  │   │   │   │   │
  │   │   │   │   ├── analytics/
  │   │   │   │   │   └── page.tsx       # Estadísticas
  │   │   │   │   │
  │   │   │   │   ├── profile/
  │   │   │   │   │   └── page.tsx       # Perfil
  │   │   │   │   │
  │   │   │   │   ├── store/
  │   │   │   │   │   └── page.tsx       # Tienda
  │   │   │   │   │
  │   │   │   │   ├── inventory/
  │   │   │   │   │   └── page.tsx       # Inventario
  │   │   │   │   │
  │   │   │   │   └── tools/             # Arsenal de herramientas
  │   │   │   │       ├── page.tsx       # Lista de herramientas
  │   │   │   │       ├── library/
  │   │   │   │       │   └── page.tsx   # Biblioteca de Poder
  │   │   │   │       ├── gym/
  │   │   │   │       │   └── page.tsx   # Templo del Hierro
  │   │   │   │       ├── meditation/
  │   │   │   │       │   └── page.tsx   # Cámara de Meditación
  │   │   │   │       ├── journal/
  │   │   │   │       │   └── page.tsx   # Bitácora de Guerra
  │   │   │   │       ├── kegel/
  │   │   │   │       │   └── page.tsx   # Vitalidad Sexual
  │   │   │   │       ├── facial/
  │   │   │   │       │   └── page.tsx   # Escultor Facial
  │   │   │   │       ├── hypnosis/
  │   │   │   │       │   └── page.tsx   # Crea tu Hipnosis [Premium]
  │   │   │   │       ├── mobility/
  │   │   │   │       │   └── page.tsx   # Movilidad Táctica
  │   │   │   │       └── focus/
  │   │   │   │           └── page.tsx   # Focus Chamber
  │   │   │   │
  │   │   │   └── blocked/
  │   │   │       └── page.tsx           # Pantalla de trial expirado
  │   │   │
  │   │   └── api/
  │   │       └── webhooks/
  │   │           ├── stripe/
  │   │           │   └── route.ts       # Webhook de Stripe
  │   │           └── replicate/
  │   │               └── route.ts       # Webhook de Replicate (futuro)
  │   │
  │   ├── components/
  │   │   │
  │   │   ├── ui/                        # Componentes base reutilizables
  │   │   │   ├── button.tsx
  │   │   │   ├── card.tsx
  │   │   │   ├── input.tsx
  │   │   │   ├── modal.tsx
  │   │   │   ├── toast.tsx
  │   │   │   ├── skeleton.tsx
  │   │   │   ├── progress.tsx
  │   │   │   ├── badge.tsx
  │   │   │   ├── tooltip.tsx
  │   │   │   └── index.ts               # Barrel export
  │   │   │
  │   │   ├── layout/                    # Componentes de layout
  │   │   │   ├── header.tsx
  │   │   │   ├── sidebar.tsx
  │   │   │   ├── bottom-nav.tsx
  │   │   │   └── footer.tsx
  │   │   │
  │   │   ├── auth/                      # Componentes de auth
  │   │   │   ├── login-form.tsx
  │   │   │   ├── register-form.tsx
  │   │   │   └── oauth-buttons.tsx
  │   │   │
  │   │   ├── onboarding/                # Componentes de onboarding
  │   │   │   ├── welcome-step.tsx
  │   │   │   ├── archetype-selector.tsx
  │   │   │   ├── vectors-tutorial.tsx
  │   │   │   ├── oath-ceremony.tsx
  │   │   │   └── notifications-setup.tsx
  │   │   │
  │   │   ├── dashboard/                 # Componentes del dashboard
  │   │   │   ├── avatar-display.tsx
  │   │   │   ├── health-bar.tsx
  │   │   │   ├── level-banner.tsx
  │   │   │   ├── stats-card.tsx
  │   │   │   ├── vectors-radar.tsx
  │   │   │   ├── time-matrix.tsx
  │   │   │   └── countdown-timer.tsx
  │   │   │
  │   │   ├── tasks/                     # Componentes de tareas
  │   │   │   ├── task-list.tsx
  │   │   │   ├── task-card.tsx
  │   │   │   ├── task-checkbox.tsx
  │   │   │   └── progress-indicator.tsx
  │   │   │
  │   │   ├── store/                     # Componentes de tienda
  │   │   │   ├── item-grid.tsx
  │   │   │   ├── item-card.tsx
  │   │   │   ├── item-modal.tsx
  │   │   │   └── category-filter.tsx
  │   │   │
  │   │   ├── tools/                     # Componentes de herramientas
  │   │   │   ├── tool-layout.tsx
  │   │   │   ├── timer.tsx
  │   │   │   ├── audio-player.tsx
  │   │   │   └── progress-tracker.tsx
  │   │   │
  │   │   └── shared/                    # Componentes compartidos
  │   │       ├── error-boundary.tsx
  │   │       ├── loading-spinner.tsx
  │   │       └── providers.tsx
  │   │
  │   ├── lib/
  │   │   │
  │   │   ├── core/                      # Lógica de negocio PURA (sin I/O)
  │   │   │   ├── vectors.ts             # Cálculos de vectores
  │   │   │   ├── levels.ts              # Cálculos de niveles
  │   │   │   ├── health.ts              # Lógica de salud
  │   │   │   ├── streak.ts              # Lógica de racha
  │   │   │   ├── judgement.ts           # Lógica de Judgement Night
  │   │   │   ├── death.ts               # Lógica de muerte/resurrección
  │   │   │   ├── economy.ts             # Cálculos de BTC
  │   │   │   ├── validations.ts         # Validaciones de negocio
  │   │   │   ├── constants.ts           # Constantes del sistema
  │   │   │   └── index.ts               # Barrel export
  │   │   │
  │   │   ├── supabase/                  # Clientes de Supabase
  │   │   │   ├── client.ts              # Cliente para browser
  │   │   │   ├── server.ts              # Cliente para server
  │   │   │   ├── middleware.ts          # Cliente para middleware
  │   │   │   └── admin.ts               # Cliente con service role
  │   │   │
  │   │   ├── stripe/                    # Integración con Stripe
  │   │   │   ├── client.ts              # Stripe client
  │   │   │   └── webhooks.ts            # Webhook handlers
  │   │   │
  │   │   ├── replicate/                 # Integración con Replicate
  │   │   │   ├── client.ts              # Replicate client
  │   │   │   └── prompts.ts             # Prompt builder
  │   │   │
  │   │   ├── validations/               # Schemas de Zod
  │   │   │   ├── auth.ts
  │   │   │   ├── tasks.ts
  │   │   │   ├── store.ts
  │   │   │   └── profile.ts
  │   │   │
  │   │   ├── utils/                     # Utilidades generales
  │   │   │   ├── cn.ts                  # clsx + tailwind-merge
  │   │   │   ├── format.ts              # Formateo de datos
  │   │   │   └── date.ts                # Utilidades de fecha
  │   │   │
  │   │   ├── env.ts                     # Validación de env vars
  │   │   └── logger.ts                  # Logging estructurado
  │   │
  │   ├── actions/                       # Server Actions
  │   │   ├── auth/
  │   │   │   ├── login.ts
  │   │   │   ├── register.ts
  │   │   │   ├── logout.ts
  │   │   │   └── verify-phone.ts
  │   │   │
  │   │   ├── tasks/
  │   │   │   ├── get-today-tasks.ts
  │   │   │   ├── complete-task.ts
  │   │   │   └── create-custom-task.ts
  │   │   │
  │   │   ├── store/
  │   │   │   ├── get-items.ts
  │   │   │   └── purchase-item.ts
  │   │   │
  │   │   ├── inventory/
  │   │   │   ├── get-inventory.ts
  │   │   │   └── equip-item.ts
  │   │   │
  │   │   ├── profile/
  │   │   │   ├── get-profile.ts
  │   │   │   └── update-profile.ts
  │   │   │
  │   │   └── payments/
  │   │       ├── create-checkout.ts
  │   │       └── create-portal-session.ts
  │   │
  │   ├── hooks/                         # Custom React hooks
  │   │   ├── use-avatar-state.ts
  │   │   ├── use-realtime-avatar.ts
  │   │   ├── use-realtime-wallet.ts
  │   │   ├── use-countdown.ts
  │   │   ├── use-timer.ts
  │   │   └── use-media-query.ts
  │   │
  │   ├── stores/                        # Zustand stores
  │   │   ├── user-store.ts
  │   │   └── ui-store.ts
  │   │
  │   ├── types/                         # Tipos TypeScript
  │   │   ├── database.types.ts          # Tipos generados de Supabase
  │   │   ├── domain.ts                  # Tipos de dominio
  │   │   ├── api.ts                     # Tipos de API responses
  │   │   └── index.ts                   # Barrel export
  │   │
  │   ├── styles/                        # Estilos adicionales
  │   │   └── fonts.ts                   # Configuración de fonts
  │   │
  │   └── middleware.ts                  # Next.js middleware (auth)
  │
  ├── tests/
  │   ├── unit/                          # Tests unitarios
  │   │   └── lib/
  │   │       └── core/
  │   │           ├── vectors.test.ts
  │   │           ├── levels.test.ts
  │   │           ├── health.test.ts
  │   │           └── ...
  │   │
  │   ├── integration/                   # Tests de integración
  │   │   └── actions/
  │   │       ├── tasks.test.ts
  │   │       └── ...
  │   │
  │   └── e2e/                           # Tests E2E (Playwright)
  │       ├── auth.spec.ts
  │       ├── onboarding.spec.ts
  │       ├── dashboard.spec.ts
  │       └── ...
  │
  ├── .env.example
  ├── .env.local                         # (gitignored)
  ├── .eslintrc.js
  ├── .gitignore
  ├── .prettierrc
  ├── .prettierignore
  ├── .editorconfig
  ├── commitlint.config.js
  ├── lint-staged.config.js
  ├── next.config.js
  ├── package.json
  ├── pnpm-lock.yaml
  ├── postcss.config.js
  ├── tailwind.config.ts
  ├── tsconfig.json
  ├── vitest.config.ts
  ├── playwright.config.ts
  └── README.md


# ============================================
# REGLA 4: CALIDAD DE CÓDIGO
# ============================================
name: "Estándares de Sistema TOP 100 mundial"
description: "Calidad quirúrgica obligatoria"

rule: |
  Todo código generado DEBE:
  1. Usar TypeScript en modo estricto (strict: true)
  2. Tener tipos explícitos en funciones exportadas
  3. Manejar errores con try/catch y tipos de error
  4. Usar Zod para validación de inputs
  5. Seguir principios SOLID
  6. Tener JSDoc para funciones públicas
  7. Ser testeable (inyección de dependencias)
  
  NUNCA:
  - Usar 'any' explícito
  - Dejar console.log en producción
  - Ignorar errores con @ts-ignore
  - Usar 'var' o 'let' innecesario

# ============================================
# REGLA 5: DOCUMENTACIÓN INLINE
# ============================================
name: "Documentación en Código"
description: "Todo código debe explicarse a sí mismo"

rule: |
  Requerimientos de documentación:
  
  1. JSDoc para funciones:
     ```typescript
     /**
      * Calcula el impacto de una tarea en los vectores del avatar
      * @param taskId - ID de la tarea completada
      * @param userId - ID del usuario
      * @returns Nuevo estado del avatar con vectores actualizados
      * @throws TaskNotFoundError si la tarea no existe
      */
     ```
  
  2. Comentarios explicativos para lógica compleja
  3. README.md en cada carpeta de /src/
  4. CHANGELOG.md para cambios significativos

# ============================================
# REGLA 6: SEGURIDAD
# ============================================
name: "Security by Design"
description: "Seguridad en cada línea de código"

rule: |
  Todo código DEBE cumplir:
  1. Validar inputs con Zod antes de procesar
  2. Usar Server Actions para operaciones sensibles
  3. Implementar RLS en todas las queries a Supabase
  4. Nunca exponer secrets en cliente
  5. Sanitizar outputs para prevenir XSS
  6. Usar idempotency keys para operaciones críticas
  7. Rate limiting en APIs públicas

# ============================================
# REGLA 7: NAMING CONVENTIONS
# ============================================
name: "Convenciones de Nomenclatura"
description: "Nombres consistentes y descriptivos"

rule: |
  Convenciones obligatorias:
  
  - Componentes: PascalCase (TaskCard.tsx)
  - Hooks: camelCase con prefijo 'use' (useAvatar.ts)
  - Utils: camelCase (calculateVectorProgress.ts)
  - Types: PascalCase con sufijo (AvatarState)
  - Enums: PascalCase (TaskCategory)
  - Constants: UPPER_SNAKE_CASE (MAX_HEALTH_POINTS)
  - Server Actions: camelCase (completeTaskAction)
  - Database: snake_case (avatar_states)

# ============================================
# REGLA 8: PERFORMANCE
# ============================================
name: "Performance Budget"
description: "Métricas de performance obligatorias"

rule: |
  Todo código DEBE respetar:
  - LCP < 2 segundos
  - TTI < 3.8 segundos
  - CLS < 0.1
  - API Response p95 < 200ms
  - Bundle size monitoreado
  
  Usar:
  - React.memo para componentes pesados
  - useMemo/useCallback apropiadamente
  - Lazy loading para rutas
  - Suspense boundaries
  - Imágenes optimizadas (next/image)