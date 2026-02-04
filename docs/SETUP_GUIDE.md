# 🚀 MetaMen100 Setup Guide

Esta guía contiene los pasos necesarios para configurar el entorno de desarrollo desde cero.

---

## 1. Prerrequisitos

- **Node.js**: v20+
- **pnpm**: v9+
- **Git**
- **VS Code** (con extensiones recomendadas)

## 2. Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd metamen100

# Instalar dependencias
pnpm install

# Instalar hooks de git
pnpm prepare
```

## 3. Variables de Entorno

El proyecto utiliza un sistema estricto de validación de entorno.
Crea un archivo `.env.local` en la raíz copiando el template:

```bash
cp .env.example .env.local
```

### Credenciales Requeridas

#### Supabase (Database & Auth)
Obtener en: [Supabase Dashboard](https://supabase.com/dashboard/project/skujvbvmqysgpylpuwah/settings/api)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Solo local, nunca en cliente)

#### Stripe (Pagos)
Obtener en: [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_...)
- `STRIPE_SECRET_KEY` (sk_test_...)
- `STRIPE_WEBHOOK_SECRET` (whsec_...)

#### Replicate (IA Generativa)
Obtener en: [Replicate Dashboard](https://replicate.com/account/api-tokens)
- `REPLICATE_API_TOKEN` (r8_...)

## 4. Base de Datos (Supabase)

El proyecto usa Supabase CLI para gestionar la base de datos local y remota.

```bash
# Iniciar Supabase localmente (Docker requerido)
pnpm supabase start

# Vincular con proyecto remoto (pedirá password de DB)
pnpm supabase link --project-ref skujvbvmqysgpylpuwah

# Descargar tipos de base de datos
pnpm db:generate
```

## 5. Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Correr tests unitarios
pnpm test

# Correr linter
pnpm lint
```

## 6. CI/CD & Despliegue

El proyecto usa GitHub Actions y Vercel.

### Pipeline Automático
- **PRs**: Se despliega automáticamente una preview en Vercel.
- **Main**: Se despliega a producción tras pasar tests.

### Secrets en GitHub
Para que el CI funcione, los siguientes secrets deben estar configurados en el repositorio:
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

---

## Solución de Problemas Comunes

### Error: "Invalid environment variables"
La app no iniciará si faltan variables en `.env.local`. Revisa `src/lib/env.ts` para ver cuáles son obligatorias.

### Error: "Supabase CLI not logged in"
Ejecuta `pnpm supabase login` y sigue las instrucciones.
