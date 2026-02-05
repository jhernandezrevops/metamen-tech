/**
 * Supabase Admin Client
 * 
 * Cliente de Supabase con Service Role Key
 * SOLO para operaciones administrativas en server-side
 * ⚠️ NUNCA exponer al cliente - Tiene acceso total a la base de datos
 * 
 * @returns Cliente admin de Supabase con service role
 * @throws {Error} Si las variables de entorno no están configuradas
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

/**
 * Crea un cliente de Supabase con Service Role Key
 * Este cliente tiene bypass de RLS y debe usarse con extrema precaución
 * Solo usar en Server Actions o Route Handlers específicos
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin credentials. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
