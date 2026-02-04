import { z } from 'zod';

/**
 * Schema de validación para variables de entorno del servidor
 * Estas variables NUNCA se exponen al cliente
 */
const serverEnvSchema = z.object({
  // Supabase
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL').optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_', 'STRIPE_SECRET_KEY must start with sk_'),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .startsWith('whsec_', 'STRIPE_WEBHOOK_SECRET must start with whsec_')
    .optional(),
  STRIPE_PRICE_MONTHLY: z
    .string()
    .startsWith('price_', 'STRIPE_PRICE_MONTHLY must start with price_')
    .optional(),
  STRIPE_PRICE_YEARLY: z
    .string()
    .startsWith('price_', 'STRIPE_PRICE_YEARLY must start with price_')
    .optional(),

  // Replicate
  REPLICATE_API_TOKEN: z
    .string()
    .startsWith('r8_', 'REPLICATE_API_TOKEN must start with r8_')
    .optional(),

  // Node
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Rate Limiting (opcional)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

/**
 * Schema de validación para variables de entorno del cliente
 * Estas variables son públicas y se exponen al navegador
 * DEBEN empezar con NEXT_PUBLIC_
 */
const clientEnvSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith('pk_', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_'),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('0.1.0'),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  NEXT_PUBLIC_ENABLE_SENTRY: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),

  // Observabilidad (opcional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional().or(z.literal('')),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
});

// Tipo inferido de las variables del servidor
export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Tipo inferido de las variables del cliente
export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Valida y retorna las variables de entorno del servidor
 * Solo llamar en código del servidor (Server Components, API Routes, Server Actions)
 */
function validateServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid server environment variables');
  }

  return parsed.data;
}

/**
 * Valida y retorna las variables de entorno del cliente
 * Safe para llamar en cualquier lugar
 */
function validateClientEnv(): ClientEnv {
  const clientEnv = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_ENABLE_SENTRY: process.env.NEXT_PUBLIC_ENABLE_SENTRY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  };

  const parsed = clientEnvSchema.safeParse(clientEnv);

  if (!parsed.success) {
    console.error('❌ Invalid client environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid client environment variables');
  }

  return parsed.data;
}

// Singleton para evitar validación múltiple
let serverEnvCache: ServerEnv | null = null;
let clientEnvCache: ClientEnv | null = null;

/**
 * Variables de entorno del servidor (lazy loaded)
 * @throws Error si las variables no son válidas
 */
export function getServerEnv(): ServerEnv {
  if (typeof window !== 'undefined') {
    throw new Error('getServerEnv() cannot be called on the client');
  }

  if (serverEnvCache === null) {
    serverEnvCache = validateServerEnv();
  }

  return serverEnvCache;
}

/**
 * Variables de entorno del cliente (lazy loaded)
 */
export function getClientEnv(): ClientEnv {
  if (clientEnvCache === null) {
    clientEnvCache = validateClientEnv();
  }

  return clientEnvCache;
}

// Para acceso directo en Server Components
export const serverEnv = typeof window === 'undefined' ? getServerEnv() : ({} as ServerEnv);

// Para acceso directo en cualquier lugar
export const clientEnv = getClientEnv();
